package com.battleq.play.service;

import com.battleq.play.domain.PlayMessageDto;
import com.battleq.play.domain.MessageType;
import com.battleq.play.domain.dto.GradingMessage;
import com.battleq.play.domain.response.MessageChatResponse;
import com.battleq.play.domain.response.MessageBasicResponse;
import com.battleq.play.domain.response.MessageGenerateResponse;
import com.battleq.play.domain.response.MessageStatusResponse;
import com.battleq.play.util.RedisUtil;
import com.battleq.quiz.domain.dto.QuizPlayDto;
import com.battleq.quiz.domain.dto.response.ExceptionResponse;
import com.battleq.quiz.domain.entity.Quiz;
import com.battleq.quiz.domain.exception.NotFoundQuizException;
import com.battleq.quiz.service.QuizService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.SimpMessageType;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.annotation.Nullable;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Random;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PlayService {

    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private RedisUtil redisUtil;

    private final QuizService quizService;

    /**
     * 6자리 PIN 생성 및 중복 검사
     * 레디스로 체크해서 있나 없나 검사해야함.
     * @return
     */
    public String generatePin(){
        Random random = new Random(System.currentTimeMillis());
        int range = (int)Math.pow(10,6);
        int trim = (int)Math.pow(10,5);

        int pin = random.nextInt(range)+trim;

        if(pin>range){
            pin = pin - trim;
        }

        return String.valueOf(pin);
    }

    /**
     * 브로커 메시지 헤더 생성
     * @param sessionId
     * @return
     */
    private MessageHeaders createHeaders(@Nullable String sessionId) {
        SimpMessageHeaderAccessor headerAccessor = SimpMessageHeaderAccessor.create(SimpMessageType.MESSAGE);
        if (sessionId != null) headerAccessor.setSessionId(sessionId);
        headerAccessor.setLeaveMutable(true);
        return headerAccessor.getMessageHeaders();
    }

    /**
     * 호스트 입장
     */
    public void joinHost(PlayMessageDto message, SimpMessageHeaderAccessor headerAccessor) throws NotFoundQuizException, JsonProcessingException {

        // 핀번호 생성
        String pin = generatePin();
        while(redisUtil.hasKey(pin)){
            pin = generatePin();
        }

        QuizPlayDto quiz = quizService.findOnePlayQuiz(Long.valueOf(message.getQuizNum()));
        // String quizContent = new ObjectMapper().writeValueAsString(quiz);

        // 생성 메시지 전송
        MessageGenerateResponse responseMessage = new MessageGenerateResponse(LocalDateTime.now(),MessageType.GENERATE,pin,quiz,"/play/joinHost");

        MessageHeaders headers = createHeaders(headerAccessor.getSessionId());
        simpMessagingTemplate.convertAndSendToUser(headerAccessor.getSessionId(),"/sub/message",responseMessage,headers);

        //레디스 작업
        redisUtil.setKey(pin,"exist");
        
    }

    /**
     * 호스트 퇴장
     */
    public void exitHost(int pin, PlayMessageDto message, SimpMessageHeaderAccessor headerAccessor) {

        // 퇴장 메시지 전송
        MessageStatusResponse responseMessage = new MessageStatusResponse(LocalDateTime.now(),MessageType.LEAVE,String.valueOf(pin),message.getSender(),"/play/exitHost");
        simpMessagingTemplate.convertAndSend("/pin/"+pin,responseMessage);

        //레디스 삭제
        redisUtil.deleteKey(String.valueOf(pin));
    }

    /**
     * 유저 입장
     */
    public void joinUser(int pin, PlayMessageDto message, SimpMessageHeaderAccessor headerAccessor) {

        //존재하지 않는 방일 경우
        if(!redisUtil.hasKey(String.valueOf(pin))){
            MessageStatusResponse responseMessage = new MessageStatusResponse(LocalDateTime.now(),MessageType.JOINFAILED,String.valueOf(pin), message.getSender(),"/play/joinUser");
            MessageHeaders headers = createHeaders(headerAccessor.getSessionId());
            simpMessagingTemplate.convertAndSendToUser(headerAccessor.getSessionId(),"/sub/message",responseMessage,headers);
            return;
        }

        // 접속 인사말
        MessageChatResponse responseMessage = new MessageChatResponse(LocalDateTime.now(),MessageType.JOIN,String.valueOf(pin), message.getSender(),message.getSender() +"님이 접속했습니다.","/play/joinUser");
        simpMessagingTemplate.convertAndSend("/sub/pin/"+pin,responseMessage);
        headerAccessor.getSessionAttributes().put("pin",pin);

        // 유저 리스트 레디스 추가
        List<String> userList = redisUtil.setUser("user_"+pin, message.getSender());

        // 유저 리스트 전송
        responseMessage = new MessageChatResponse(LocalDateTime.now(),MessageType.USERLIST,String.valueOf(pin), "", userList,"/play/userList");
        simpMessagingTemplate.convertAndSend("/sub/pin/"+pin,responseMessage);
    }

    /**
     * 유저 퇴장
     */
    public void exitUser(int pin, PlayMessageDto message, SimpMessageHeaderAccessor headerAccessor){

        // 퇴장 알림
        MessageChatResponse responseMessage = new MessageChatResponse(LocalDateTime.now(),MessageType.LEAVE,String.valueOf(pin), message.getSender(),message.getSender() +"님이 퇴장하셨습니다.","/play/exitUser");
        simpMessagingTemplate.convertAndSend("/sub/pin/"+pin,responseMessage);
        headerAccessor.getSessionAttributes().put("pin",pin);

        // 퇴장 레디스 데이터 삭제
        List<String> userList = redisUtil.deleteUser("user_"+pin, message.getSender());

        // 유저 리스트 전송
        responseMessage = new MessageChatResponse(LocalDateTime.now(),MessageType.USERLIST,String.valueOf(pin), message.getSender(),userList,"/play/exitUser");
        simpMessagingTemplate.convertAndSend("/sub/pin/"+pin,responseMessage);
    }


    /**
     * 퀴즈 시작
     */
    public void startQuiz(int pin, SimpMessageHeaderAccessor headerAccessor){

        // 퀴즈 시작 전송 메시지
        MessageStatusResponse responseMessage = new MessageStatusResponse(LocalDateTime.now(),MessageType.START,String.valueOf(pin), "","/play/startQuiz");
        simpMessagingTemplate.convertAndSend("/sub/pin/"+pin,responseMessage);
    }

    /**
     * 퀴즈 단계 종료
     */
    public void finishQuiz(int pin,SimpMessageHeaderAccessor headerAccessor){

        // 퀴즈 단계 종료 메시지
        MessageStatusResponse responseMessage = new MessageStatusResponse(LocalDateTime.now(),MessageType.FINISH,String.valueOf(pin), "","/play/finishQuiz");
        simpMessagingTemplate.convertAndSend("/sub/pin/"+pin,responseMessage);
    }

    /**
     * 퀴즈 단계 진행
     */
    public void nextQuiz(int pin, SimpMessageHeaderAccessor headerAccessor){

        // 퀴즈 단계 진행 메시지
        MessageStatusResponse responseMessage = new MessageStatusResponse(LocalDateTime.now(),MessageType.NEXT,String.valueOf(pin), "","/play/nextQuiz");
        simpMessagingTemplate.convertAndSend("/sub/pin/"+pin,responseMessage);
    }

    /**
     * 퀴즈 전체 종료
     */
    public void endQuiz(int pin, SimpMessageHeaderAccessor headerAccessor){

        // 퀴즈 전체 종료 메시지
        MessageStatusResponse responseMessage = new MessageStatusResponse(LocalDateTime.now(),MessageType.END,String.valueOf(pin), "","/play/finishQuiz");
        simpMessagingTemplate.convertAndSend("/sub/pin/"+pin,responseMessage);
    }

    /**
     * 퀴즈 문항
     */
    public void sendQuizItem(int pin, PlayMessageDto message, SimpMessageHeaderAccessor headerAccessor){

    }

    /**
     * 퀴즈 정답
     */
    public void sendAnswer(int pin, PlayMessageDto message, SimpMessageHeaderAccessor headerAccessor){

    }

    public void test(int pin, PlayMessageDto message, SimpMessageHeaderAccessor headerAccessor) {
        System.out.println("pin = " + pin);
        System.out.println("SessionId = " + headerAccessor.getSessionId());
        String sessionId = headerAccessor.getSessionId();
        System.out.println("message.getSender() = " + message.getSender());

        headerAccessor.getSessionAttributes().put("senderName",message.getSender());

        MessageHeaders headers = createHeaders(sessionId);
        simpMessagingTemplate.convertAndSend("/sub/pin/"+pin,message);
        simpMessagingTemplate.convertAndSendToUser(sessionId,"/sub/message",message,headers);

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss.SSS");
        Date now = new Date();
        GradingMessage gradingMessage = new GradingMessage();
        gradingMessage.setSessionId(headerAccessor.getSessionId());
        gradingMessage.setSubmissionTime(dateFormat.format(now));
        gradingMessage.setAnswer(message.getContent());

        String key = Integer.toString(pin);
        redisUtil.setAnswerData(key, gradingMessage);

    }

    public void chatRoom(int pin, PlayMessageDto message, SimpMessageHeaderAccessor headerAccessor) {

        MessageChatResponse chatMessageResponse = new MessageChatResponse(LocalDateTime.now(),MessageType.CHAT,String.valueOf(pin),message.getSender(), message.getContent(),"/play/joinHost");

        simpMessagingTemplate.convertAndSend("/sub/pin/"+pin,chatMessageResponse);
    }

}
