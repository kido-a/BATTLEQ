package com.battleq.quizItem.domain.dto.request;

import com.battleq.quizItem.domain.QuizType;
import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class UpdateQuizItemRequest{
    @NotEmpty
    private String title;
    private String content;
    private String image;
    private QuizType type;
    private String limitTime;
    private String point;
    private String pointType;
    private Long ownerId;

}
