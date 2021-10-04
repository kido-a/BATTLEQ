package com.battleq.quiz.controller;

import com.battleq.quiz.domain.dto.request.QuizSearchCategoryRequest;
import com.battleq.quiz.domain.dto.request.QuizSearchNameRequest;
import com.battleq.quiz.domain.dto.request.QuizSearchNicknameRequest;
import com.battleq.quiz.domain.dto.response.ExceptionResponse;
import com.battleq.quiz.domain.dto.response.QuizListResponse;
import com.battleq.quiz.domain.dto.response.QuizSearchResponseWithPaging;
import com.battleq.quiz.domain.exception.NotFoundQuizException;
import com.battleq.quiz.service.QuizSearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
public class QuizSearchController {
    private final QuizSearchService quizSearchService;

    /**
     * 퀴즈 작성자 닉네임으로 검색
     */
    @GetMapping(value = "/quiz/nick/{nickname}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity findQuizWithNickname(@PathVariable("nickname") String nickname,
                                               @RequestParam("offset")int offset,
                                                @RequestParam("limit")int limit) throws Exception {
        QuizSearchNicknameRequest dto = new QuizSearchNicknameRequest(nickname,limit,offset);
        QuizListResponse response;
        if (nickname == null || "".equals(nickname)) {
            response = new QuizListResponse(LocalDateTime.now(), HttpStatus.BAD_REQUEST, null, "검색 키워드(닉네임)이 입력되지 않았습니다.", "/quiz");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
        QuizSearchResponseWithPaging result = quizSearchService.searchQuizWithNickname(dto);
        return new ResponseEntity<>(result,HttpStatus.OK);

    }
    @GetMapping(value = "/quiz/name/{name}")
    public ResponseEntity findQuizWithName(@PathVariable("name") String name,
                                           @RequestParam("offset")int offset,
                                           @RequestParam("limit")int limit) throws Exception {
        QuizSearchNameRequest dto = new QuizSearchNameRequest(name,limit,offset);
        QuizListResponse response;
        if (name == null || "".equals(name)) {
            response = new QuizListResponse(LocalDateTime.now(), HttpStatus.BAD_REQUEST, null, "검색 키워드(퀴즈명)이 입력되지 않았습니다.", "/quiz");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
        QuizSearchResponseWithPaging result = quizSearchService.searchQuizWithName(dto);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    @GetMapping(value = "/quiz/category/{category}")
    public ResponseEntity findQuizWithCategory(@PathVariable("category") String category,
                                               @RequestParam("offset")int offset,
                                               @RequestParam("limit")int limit) throws Exception {
        QuizSearchCategoryRequest dto = new QuizSearchCategoryRequest(category,limit,offset);
        if (category == null || "".equals(category)) {
            QuizListResponse response = new QuizListResponse(LocalDateTime.now(), HttpStatus.BAD_REQUEST, null, "검색 키워드(퀴즈명)이 입력되지 않았습니다.", "/quiz");
            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
        }
        QuizSearchResponseWithPaging result = quizSearchService.searchQuizWithCategory(dto);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    @ExceptionHandler({NotFoundQuizException.class})
    public ResponseEntity<ExceptionResponse> NotFoundQuiz(final Exception ex) {
        return new ResponseEntity<ExceptionResponse>(new ExceptionResponse(LocalDateTime.now(), HttpStatus.NOT_FOUND, "NOT_FOUND", "콘텐츠를 찾을 수 없습니다.", "/api/v1/quiz"),HttpStatus.NO_CONTENT);
    }

}
