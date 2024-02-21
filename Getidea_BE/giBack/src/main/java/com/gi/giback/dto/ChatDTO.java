package com.gi.giback.dto;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatDTO {
    private String userEmail;
    private String profileImg;
    private String message;
    private LocalDateTime timestamp;

}
