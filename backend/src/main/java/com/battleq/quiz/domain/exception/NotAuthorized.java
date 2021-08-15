package com.battleq.quiz.domain.exception;

public class NotAuthorized extends Exception{
    public NotAuthorized(){

    }
    public NotAuthorized(String message) {
        super(message);
    }
}
