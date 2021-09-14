package com.battleq.quizItem.domain;

import com.battleq.quiz.domain.dto.QuizDto;
import com.battleq.quiz.domain.dto.request.CreateQuizRequest;
import com.battleq.quiz.domain.dto.request.UpdateQuizRequest;
import com.battleq.quizItem.domain.dto.QuizItemDto;
import com.battleq.quizItem.domain.dto.request.CreateQuizItemRequest;
import com.battleq.quizItem.domain.dto.request.UpdateQuizItemRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface QuizItemMapper {
    QuizItemMapper INSTANCE = Mappers.getMapper(QuizItemMapper.class);

    @Mapping(source = "ownerId", target = "memberId")
    QuizItemDto createQuizItemRequestToDto(CreateQuizItemRequest request);

    @Mapping(source = "ownerId", target = "memberId")
    QuizItemDto updateQuizItemRequestToDto(UpdateQuizItemRequest request);
}
