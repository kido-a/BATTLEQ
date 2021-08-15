package com.battleq.quizItem.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class QuizItemResponse<T>{
    private String status;
    private T data;
    private String message;
}