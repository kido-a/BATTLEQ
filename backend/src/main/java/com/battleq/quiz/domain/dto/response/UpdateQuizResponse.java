package com.battleq.quiz.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UpdateQuizResponse{
    private Long id;
    private String name;
}