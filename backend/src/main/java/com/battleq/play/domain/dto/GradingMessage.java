package com.battleq.play.domain.dto;

import lombok.*;

import java.text.SimpleDateFormat;
import java.util.Date;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GradingMessage {
    private String sessionId;
    private String submissionTime;
    private String answer;
}
