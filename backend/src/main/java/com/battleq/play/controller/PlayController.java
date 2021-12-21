package com.battleq.play.controller;

import com.battleq.play.domain.PlayMessageDto;
import com.battleq.play.service.PlayService;
import com.battleq.quiz.domain.dto.response.ExceptionResponse;
import com.battleq.quiz.domain.exception.NotFoundQuizException;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
public class PlayController {

    private final PlayService playService;

    private final SimpMessagingTemplate simpMessagingTemplate;

    /*@MessageMapping("/play/test/{pin}")
    public void test(@DestinationVariable("pin") int pin, @Payload PlayMessageDto message, SimpMessageHeaderAccessor headerAccessor){
        playService.test(pin,message,headerAccessor);
    }*/

    /**
     * 호스트 입장
     */
    @MessageMapping("/play/joinHost/")
    public void joinHost(@Payload PlayMessageDto message, SimpMessageHeaderAccessor headerAccessor) throws NotFoundQuizException, JsonProcessingException {
        playService.joinHost(message,headerAccessor);
    }

    /**
     * 호스트 퇴장
     */
    @MessageMapping("/play/exitHost/{pin}")
    public void exitHost(@DestinationVariable("pin") int pin, @Payload PlayMessageDto message, SimpMessageHeaderAccessor headerAccessor){
        playService.exitHost(pin,message,headerAccessor);
    }

    /**
     * 채팅
     */
    @MessageMapping("/play/chatRoom/{pin}")
    public void chatRoom(@DestinationVariable("pin")int pin, @Payload PlayMessageDto message, SimpMessageHeaderAccessor headerAccessor){
        playService.chatRoom(pin,message,headerAccessor);
    }

    /**
     * 유저 입장
     */
    @MessageMapping("/play/joinUser/{pin}")
    public void joinUser(@DestinationVariable("pin") int pin, @Payload PlayMessageDto message, SimpMessageHeaderAccessor headerAccessor){
        playService.joinUser(pin,message,headerAccessor);
    }

    /**
     * 유저 퇴장
     */
    @MessageMapping("/play/exitUser/{pin}")
    public void exitUser(@DestinationVariable("pin") int pin, @Payload PlayMessageDto message, SimpMessageHeaderAccessor headerAccessor){
        playService.exitUser(pin,message,headerAccessor);
    }

    /**
     * 유저 강퇴
     * sessionId 값으로 퇴장 시켜야함 일단 ㄱㄷ
     */
    @MessageMapping("/play/banUser/{pin}")
    public void banUser(@DestinationVariable("pin") int pin, @Payload PlayMessageDto message, SimpMessageHeaderAccessor headerAccessor){
        playService.exitHost(pin,message,headerAccessor);
    }

    /**
     * 퀴즈 시작
     */
    @MessageMapping("/play/startQuiz/{pin}")
    public void startQuiz(@DestinationVariable("pin") int pin, SimpMessageHeaderAccessor headerAccessor){
        playService.startQuiz(pin,headerAccessor);
    }

    /**
     * 퀴즈 단계 종료
     */
    @MessageMapping("/play/finishQuiz/{pin}")
    public void finishQuiz(@DestinationVariable("pin") int pin, SimpMessageHeaderAccessor headerAccessor){
        playService.finishQuiz(pin,headerAccessor);
    }

    /**
     * 퀴즈 단계 진행
     */
    @MessageMapping("/play/nextQuiz/{pin}")
    public void nextQuiz(@DestinationVariable("pin") int pin, SimpMessageHeaderAccessor headerAccessor){
        playService.nextQuiz(pin,headerAccessor);
    }

    /**
     * 퀴즈 전체 종료
     */
    @MessageMapping("/play/endQuiz/{pin}")
    public void endQuiz(@DestinationVariable("pin") int pin, SimpMessageHeaderAccessor headerAccessor){
        playService.endQuiz(pin,headerAccessor);
    }

    /**
     * 퀴즈 문항
     */
    @MessageMapping("/play/sendQuizItem/{pin}")
    public void sendQuizItem(@DestinationVariable("pin") int pin, @Payload PlayMessageDto message, SimpMessageHeaderAccessor headerAccessor){
        playService.exitHost(pin,message,headerAccessor);
    }

    /**
     * 퀴즈 정답
     */
    @MessageMapping("play/sendAnswer/{pin}")
    public void sendAnswer(@DestinationVariable("pin") int pin, @Payload PlayMessageDto message, SimpMessageHeaderAccessor headerAccessor){
        playService.exitHost(pin,message,headerAccessor);
    }

    @ExceptionHandler({NotFoundQuizException.class})
    public ExceptionResponse NotFoundQuiz(final Exception ex) {
        return new ExceptionResponse(LocalDateTime.now(), HttpStatus.NOT_FOUND, "NOT_FOUND", "퀴즈를 찾을 수 없습니다.", "/api/v1/quiz");
    }

}
