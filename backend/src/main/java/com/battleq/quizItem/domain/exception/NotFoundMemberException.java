package com.battleq.quizItem.domain.exception;

public class NotFoundMemberException extends Exception{
    public NotFoundMemberException(){

    }
    public NotFoundMemberException(String message) {
        super(message);
    }
}
