package com.battleq.play.domain;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlayMessageDto {
    private MessageType messageType;
    private String content;
    private String sender;
    private String quizNum;
}
