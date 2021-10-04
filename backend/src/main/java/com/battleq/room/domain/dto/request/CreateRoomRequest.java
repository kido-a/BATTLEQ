package com.battleq.room.domain.dto.request;

import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Data
public class CreateRoomRequest {
    @NotEmpty
    private String name;

    private int capacity;

    @NotNull
    private Long quizId;
}
