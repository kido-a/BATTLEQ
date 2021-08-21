package com.battleq.quiz.domain.dto;

import com.battleq.quiz.domain.dto.request.CreateQuizRequest;
import com.battleq.quiz.domain.dto.request.UpdateQuizRequest;
import com.battleq.quiz.domain.entity.Quiz;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface QuizMapper {
    QuizMapper INSTANCE = Mappers.getMapper(QuizMapper.class);

    @Mapping(source = "ownerId", target = "memberId")
    QuizDto createQuizRequestToDto(CreateQuizRequest request);

    @Mapping(source = "ownerId", target = "memberId")
    QuizDto updateQuizRequestToDto(UpdateQuizRequest request);

    /*@Mapping(target = "creationDate", expression = "java(java.time.LocalDateTime.now())")
    @Mapping(target = "member")
    Quiz quizDtoToEntity(QuizDto quizDto);

    @Mapping(target = "")
    QuizDto quizToDto(Quiz quiz);*/

}
