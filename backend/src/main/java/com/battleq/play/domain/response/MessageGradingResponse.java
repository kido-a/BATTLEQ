package com.battleq.play.domain.response;

import com.battleq.play.domain.MessageType;
import com.battleq.play.domain.dto.GradingResultMessage;
import com.battleq.quiz.domain.dto.QuizPlayDto;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
public class MessageGradingResponse {
    private LocalDateTime timestamp;
    private MessageType messageType;
    private String pin;
    private List<GradingResultMessage> content;
    private String path;
}
