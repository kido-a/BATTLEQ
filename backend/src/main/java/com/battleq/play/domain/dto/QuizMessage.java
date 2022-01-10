package com.battleq.play.domain.dto;

import com.battleq.play.domain.MessageType;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizMessage {
    private MessageType messageType;
    private String sender;
    private String quizItemId;
}
