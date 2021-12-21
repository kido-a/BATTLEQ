package com.battleq.play.domain.response;

import com.battleq.play.domain.MessageType;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class MessageStatusResponse {
    private LocalDateTime timestamp;
    private MessageType messageType;
    private String pin;
    private String sender;
    private String path;
}
