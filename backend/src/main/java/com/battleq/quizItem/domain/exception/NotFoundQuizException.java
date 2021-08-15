package com.battleq.quizItem.domain.exception;

public class NotFoundQuizException extends Exception{
    public NotFoundQuizException(){

    }
    public NotFoundQuizException(String message) {
        super(message);
    }
}
