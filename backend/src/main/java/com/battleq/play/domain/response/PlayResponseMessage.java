package com.battleq.play.domain.response;

import com.battleq.play.domain.MessageType;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class PlayResponseMessage {
    private LocalDateTime timestamp;
    private MessageType messageType;
    private String pin;
    private Object message;
    private String path;
}
