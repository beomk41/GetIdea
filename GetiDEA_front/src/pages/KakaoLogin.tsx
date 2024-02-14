import React, { useEffect,useState } from 'react';
import { useNavigate,useSearchParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const KakaoLogin: React.FC = () => {
  const navigate = useNavigate();

  const [accessToken, setAccessToken] = useState<string | undefined>();
  const [refreshToken, setRefreshToken] = useState<string | undefined>();

  useEffect(() => {
    // 쿠키에서 토큰 읽어오기
    const access_Token = Cookies.get('access_token');
    const refresh_Token = Cookies.get('refresh_token');

    console.log(Cookies.get('access_token'));
    console.log(refreshToken);
    // 상태 업데이트
    setAccessToken(access_Token);
    setRefreshToken(refresh_Token);

    // 로컬 스토리지에 저장
    if (accessToken && refreshToken) {
      // JWT 디코딩
      try {
        const decoded = jwtDecode(accessToken);
        console.log(`토큰 디코딩 결과: ${JSON.stringify(decoded)}`);
        navigate("/home");
      } catch (error) {
        console.error("토큰 디코딩 실패:", error);
      }
    }
  
  }, []);

  useEffect(() => {
    // 목표 URL로 리다이렉션
    window.location.href=`${process.env.REACT_APP_KAKAO_LOGIN_URI}?redirect_uri=http://localhost:3004&mode=login`;
  }, []);

  return null; // 리다이렉션 중에는 아무것도 렌더링하지 않습니다.
};


export default KakaoLogin;
