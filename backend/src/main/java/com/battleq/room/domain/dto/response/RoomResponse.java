package com.battleq.room.domain.dto.response;

import com.battleq.room.domain.dto.RoomDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class RoomResponse<T> {
    private LocalDateTime timestamp;
    private HttpStatus status;
    private T data;
    private String message;
    private String path;


}
