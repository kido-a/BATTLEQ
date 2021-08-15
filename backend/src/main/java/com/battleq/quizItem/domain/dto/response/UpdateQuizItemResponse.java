package com.battleq.quizItem.domain.dto.response;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateQuizItemResponse{
    private Long id;
    private String name;
}
