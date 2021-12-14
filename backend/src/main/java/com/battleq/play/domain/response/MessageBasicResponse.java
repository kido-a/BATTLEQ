package com.battleq.play.domain.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor

public class MessageBasicResponse<T> {
    private LocalDateTime timestamp;
    private HttpStatus status;
    private T data;
    private String message;
    private String path;
}
