package com.battleq.room.domain.dto.response;

import lombok.Data;

@Data
public class CreateRoomResponse {
    private int pin;

    public CreateRoomResponse(int pin){
        this.pin = pin;
    }
}
