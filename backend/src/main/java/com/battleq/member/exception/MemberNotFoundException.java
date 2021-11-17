package com.battleq.member.exception;

public class MemberNotFoundException extends Exception{
    public MemberNotFoundException(){

    }
    public MemberNotFoundException(String message) {
        super(message);
    }
}
