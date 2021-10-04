package com.battleq.quiz.service;

import com.battleq.quiz.domain.dto.QuizSearchDto;
import com.battleq.quiz.domain.dto.request.QuizSearchCategoryRequest;
import com.battleq.quiz.domain.dto.request.QuizSearchNameRequest;
import com.battleq.quiz.domain.dto.request.QuizSearchNicknameRequest;
import com.battleq.quiz.domain.dto.response.QuizSearchResponseWithPaging;
import com.battleq.quiz.domain.exception.NotFoundQuizException;
import com.battleq.quiz.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class QuizSearchService {

    private final QuizRepository quizRepository;


    /**
     * 이름으로 검색
     */
    public QuizSearchResponseWithPaging searchQuizWithNickname(QuizSearchNicknameRequest dto) throws Exception {
        int count = quizRepository.countAllQuizWithMemberNickname(dto.getNickname()).size();
        if (count == 0) {
            throw new NotFoundQuizException();
        }
        List<QuizSearchDto> result = quizRepository.findAllQuizWithMemberNickname(dto.getNickname(),dto.getOffset(),dto.getLimit())
                .stream().map(quiz -> new QuizSearchDto(quiz)).collect(Collectors.toList());
        return new QuizSearchResponseWithPaging(count,result);
    }

    /**
     * 퀴즈 이름으로 검색
     */
    public QuizSearchResponseWithPaging searchQuizWithName(QuizSearchNameRequest dto) throws Exception {
        int count = quizRepository.countAllQuizWithName(dto.getName()).size();
        if (count == 0) {
            throw new NotFoundQuizException();
        }
        List<QuizSearchDto> result = quizRepository.findAllQuizWithName(dto.getName(),dto.getOffset(),dto.getLimit())
                .stream().map(quiz -> new QuizSearchDto(quiz)).collect(Collectors.toList());
        return new QuizSearchResponseWithPaging(count,result);
    }

    /**
     *  카테고리로 검색
     */
    public QuizSearchResponseWithPaging searchQuizWithCategory (QuizSearchCategoryRequest dto) throws Exception {
        int count = quizRepository.countAllQuizWithCategory(dto.getCategory()).size();
        if (count == 0) {
            throw new NotFoundQuizException();
        }
        List<QuizSearchDto> result = quizRepository.findAllQuizWithCategory(dto.getCategory(),dto.getOffset(),dto.getLimit())
                .stream().map(quiz -> new QuizSearchDto(quiz)).collect(Collectors.toList());
        return new QuizSearchResponseWithPaging(count,result);
    }
}
