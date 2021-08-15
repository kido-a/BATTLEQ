package com.battleq.quiz.controller;

import com.battleq.quiz.domain.dto.QuizDto;
import com.battleq.quiz.domain.dto.QuizMapper;
import com.battleq.quiz.domain.dto.request.CreateQuizRequest;
import com.battleq.quiz.domain.dto.request.UpdateQuizRequest;
import com.battleq.quiz.domain.dto.response.*;
import com.battleq.quiz.domain.entity.Quiz;
import com.battleq.quiz.domain.exception.NotAuthorized;
import com.battleq.quiz.domain.exception.NotFoundMemberException;
import com.battleq.quiz.domain.exception.NotFoundQuizException;
import com.battleq.quiz.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class QuizApiController {

    private final QuizService quizService;

    @GetMapping("api/v1/quiz")
    public QuizListResponse findAllQuizV1(
            @RequestParam(value = "offset", defaultValue = "0") int offset,
            @RequestParam(value = "limit", defaultValue = "10") int limit) {

        List<QuizDto> resultQuizzes = quizService.findAllQuiz(offset, limit).stream()
                .map(m -> new QuizDto(m))
                .collect(Collectors.toList());

        return new QuizListResponse(LocalDateTime.now(),HttpStatus.OK, resultQuizzes, "퀴즈 전체 검색","api/v1/quiz");
    }

    @GetMapping("api/v1/quiz/{quizId}")
    public QuizResponse findOneQuizV1(@PathVariable("quizId") Long quizId) throws NotFoundQuizException {

        QuizDto quizDto = new QuizDto(quizService.findOne(quizId));

        return new QuizResponse(LocalDateTime.now(),HttpStatus.OK, quizDto, "퀴즈 단일 검색", "api/v1/quiz");
    }

    @PostMapping("api/v1/quiz")
    public CreateQuizResponse saveQuizV1(@RequestBody @Valid CreateQuizRequest request) throws Exception {

        QuizDto dto = QuizMapper.INSTANCE.createQuizRequestToDto(request);

        Long id = quizService.saveQuiz(dto);
        return new CreateQuizResponse(id);
    }

    @PutMapping("api/v1/quiz/{quizId}")
    public UpdateQuizResponse updateQuizFormV1(@PathVariable("quizId") Long quizId, @RequestBody @Valid UpdateQuizRequest request) throws Exception {

        QuizDto dto = QuizMapper.INSTANCE.updateQuizRequestToDto(request);

        quizService.update(quizId, dto);
        Quiz findQuiz = quizService.findOne(quizId);
        return new UpdateQuizResponse(findQuiz.getId(), findQuiz.getName());
    }

    @ExceptionHandler({NotFoundMemberException.class})
    public ExceptionResponse NotFoundMember(final Exception ex) {
        return new ExceptionResponse(LocalDateTime.now(), HttpStatus.NOT_FOUND, "NOT_FOUND", "유저 정보가 존재하지 않습니다.", "/api/v1/member");
    }

    @ExceptionHandler({NotFoundQuizException.class})
    public ExceptionResponse NotFoundQuiz(final Exception ex) {
        return new ExceptionResponse(LocalDateTime.now(), HttpStatus.NOT_FOUND, "NOT_FOUND", "콘텐츠를 찾을 수 없습니다.", "/api/v1/quiz");
    }
    @ExceptionHandler({NotAuthorized.class})
    public ExceptionResponse NotAuthorizedQuiz(final Exception ex) {
        return new ExceptionResponse(LocalDateTime.now(), HttpStatus.UNAUTHORIZED, "UNAUTHORIZED", "권한이 없습니다. ", "/api/v1/quiz");
    }
}
