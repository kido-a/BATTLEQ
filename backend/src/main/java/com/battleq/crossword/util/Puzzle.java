package com.battleq.crossword.util;

public class Puzzle {
    int x;
    int y;
    int quiz;
    int dis;

    public Puzzle(int x, int y, int quiz, int dis) {
        super();
        this.x = x;
        this.y = y;
        this.quiz = quiz;
        this.dis = dis;
    }
    @Override
    public String toString() {
        return "Puzzle [x=" + x + ", y=" + y + ", quiz=" + quiz + ", dis=" + dis + "]";
    }
}
