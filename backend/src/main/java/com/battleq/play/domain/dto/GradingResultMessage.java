package com.battleq.play.domain.dto;

import com.battleq.play.domain.MessageType;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GradingResultMessage implements Comparable<GradingResultMessage> {
    private MessageType messageType;
    private double score;
    private double rank;
    private String owner;
    private String sessionId;

    @Override
    public int compareTo(GradingResultMessage o) {
        if(this.rank > o.rank){
            return 1;
        }else if(this.rank < o.rank){
            return -1;
        }else {
            return 0;
        }
    }
}
