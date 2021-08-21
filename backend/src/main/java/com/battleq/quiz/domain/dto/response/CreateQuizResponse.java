package com.battleq.quiz.domain.dto.response;

import lombok.Data;

@Data
public class CreateQuizResponse{
    private Long id;

    public CreateQuizResponse(Long id){
        this.id = id;
    }
}