package com.gi.giback.jwt.filter;

import com.gi.giback.jwt.service.JwtService;
import com.gi.giback.mysql.entity.UserEntity;
import com.gi.giback.mysql.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserService userService;

    public JwtAuthenticationFilter(JwtService jwtService, UserService userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String requestURI = request.getRequestURI();

        if (requestURI.startsWith("/swagger-ui") || requestURI.startsWith("/v3/api-docs") || requestURI.startsWith("/swagger-resources") || requestURI.startsWith("/webjars")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = getTokenFromRequest(request);
        if (token != null && jwtService.validateToken(token)) {

            String userEmail = jwtService.getUserEmailFromToken(token);
            log.info("USER : {}", userEmail);
            List<GrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userEmail, null, authorities); // 권한 정보 등을 추가할 수 있음
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.info("{}", SecurityContextHolder.getContext().getAuthentication());

        } else { // 액세스 토큰 만료되어서 리프레시 확인
            log.info("AccessToken is not valid");
            String refreshToken = getRefreshTokenFromRequest(request);
            if (refreshToken != null && jwtService.validateToken(refreshToken)) {
                // 리프레시 토큰이 존재하면, 새로운 액세스 토큰 발급
                UserEntity user = userService.getUserByRefreshToken(refreshToken);

                if (user != null) {

                    String newAccessToken = jwtService.createAccessToken(user.getUserEmail(), user.getUserName(), user.getProvider().toString());
                    response.setHeader("Authorization", "Bearer " + newAccessToken);
                    // 클라이언트한테 다시 액세스 토큰 전송 필요

                } else {

                    log.info("RefershToken is not valid");
                    // 리프레시 토큰에 해당하는 사용자가 없을 때
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); // 401 Unauthorized
                    SecurityContextHolder.clearContext(); // 사용자 로그아웃
                    // 리프레시 토큰 만기시 다시 로그인 시켜야함
                }
            }
        }
        filterChain.doFilter(request, response);
    }

    private String getRefreshTokenFromRequest(HttpServletRequest request) {
        String refreshToken = request.getHeader("Authorization-refresh");
        if (refreshToken != null && refreshToken.startsWith("Bearer ")) {
            return refreshToken.substring(7);
        }
        return null;
    }

    private String getTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}