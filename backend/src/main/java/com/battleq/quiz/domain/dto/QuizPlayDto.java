package com.battleq.quiz.domain.dto;

import com.battleq.quizItem.domain.dto.QuizItemDto;
import lombok.*;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizPlayDto {
    private String name;
    private String category;
    private String thumbnail;
    private String introduction;
    private List<Long> quizItemId;
}
