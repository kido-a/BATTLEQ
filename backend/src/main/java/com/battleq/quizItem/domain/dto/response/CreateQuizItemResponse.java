package com.battleq.quizItem.domain.dto.response;

import lombok.Data;

@Data
public class CreateQuizItemResponse{
    private Long id;

    public CreateQuizItemResponse(Long id ){
        this.id = id;
    }
}
