package com.battleq.quiz.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class QuizSearchCategoryRequest {
    private String category;
    private int limit;
    private int offset;
}
