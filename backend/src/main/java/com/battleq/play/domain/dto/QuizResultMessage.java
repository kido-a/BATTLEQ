package com.battleq.play.domain.dto;

import com.battleq.play.domain.MessageType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizResultMessage implements Comparable<QuizResultMessage>{
    private MessageType messageType;
    private String sessionId;
    private String sender;
    private double score;
    private double rank;

    @Override
    public int compareTo(QuizResultMessage o) {
        if(this.score > o.score){
            return -1;
        }else if(this.score < o.score){
            return 1;
        }else {
            return 0;
        }
    }

    /**
     * 문제별 점수 및 등수 표시하기
     */
    // private long quizItemId;
}
