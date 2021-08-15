package com.battleq.quizItem.domain.exception;

public class NotFoundQuizItemException extends Exception{
    public NotFoundQuizItemException(){

    }
    public NotFoundQuizItemException(String message) {
        super(message);
    }
}
