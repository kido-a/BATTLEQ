package com.battleq.room.domain.dto;

import com.battleq.quiz.domain.entity.Quiz;
import com.battleq.room.domain.entity.Room;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoomDto {
    private String name;
    private int pin;
    private int capacity;
    private Long quizId;

    public RoomDto(Room room){
        this.name = room.getName();
        this.pin = room.getPin();
        this.capacity = room.getCapacity();
        this.quizId = room.getQuiz().getId();
    }
}
