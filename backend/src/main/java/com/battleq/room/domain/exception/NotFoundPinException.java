package com.battleq.room.domain.exception;

public class NotFoundPinException extends Exception{
    public NotFoundPinException(){

    }
    public NotFoundPinException(String message){
        super(message);
    }
}
