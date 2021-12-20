package com.battleq.play.domain.response;

import com.battleq.play.domain.MessageType;
import com.battleq.quiz.domain.dto.QuizPlayDto;
import com.battleq.quiz.domain.entity.Quiz;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class MessageGenerateResponse {
    private LocalDateTime timestamp;
    private MessageType messageType;
    private String pin;
    private QuizPlayDto content;
    private String path;
}
