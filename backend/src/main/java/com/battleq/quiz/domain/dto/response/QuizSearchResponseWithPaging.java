package com.battleq.quiz.domain.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class QuizSearchResponseWithPaging<T> {
    private int totCnt;
    private T data;
}
