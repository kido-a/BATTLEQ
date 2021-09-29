package com.battleq.room.domain.entity;

import com.battleq.quiz.domain.entity.Quiz;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;

/**
 * id : 식별자
 * name : 방 제목
 * category : 미션 분류
 * thumbnail : 썸네일
 * introduction : 소개
 * quizDate : 생성 시간
 * view : 미션 조회수
 */
@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "rooms")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private Long id;

    @NotEmpty
    private String name;

    private int pin;

    private int capacity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    public static Room initRoom(String name, int pin,  int capacity,Quiz quiz){
        Room room = Room.builder()
                .name(name)
                .pin(pin)
                .capacity(capacity)
                .quiz(quiz)
                .build();

        return room;
    }
}
