package com.battleq.crossword.domain.dto.response;

public class Puzzle {
    int x;
    int y;
    int quiz;
    int dis;

    public Puzzle(int x, int y, int quiz, int dis) {
        this.x = x;
        this.y = y;
        this.quiz = quiz;
        this.dis = dis;
    }
}
