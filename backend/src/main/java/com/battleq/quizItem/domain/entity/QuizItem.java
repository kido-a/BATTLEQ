package com.battleq.quizItem.domain.entity;

import com.battleq.member.domain.entity.Member;
import com.battleq.quiz.domain.entity.Quiz;
import com.battleq.quizItem.domain.QuizType;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

import static javax.persistence.FetchType.LAZY;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QuizItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quizItem_id")
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "quiz_id")
    private Quiz quiz;

    @OneToOne(fetch = LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private String title; //퀴즈 제목
    private String content; //퀴즈 내용
    private String image; //퀴즈 이미지
    private QuizType type; // 퀴즈 타입
    private String limitTime; // 퀴즈 제한시간
    private String point; // 퀴즈 포인트
    private String pointType; // 퀴즈 타입

    public static QuizItem createQuizItem(String title, String content, String image, QuizType type, String limitTime,String point, String pointType, Member member, Quiz quiz){
        QuizItem quizItem = QuizItem.builder()
                .title(title)
                .content(content)
                .image(image)
                .type(type)
                .limitTime(limitTime)
                .point(point)
                .pointType(pointType)
                .member(member)
                .quiz(quiz)
                .build();
        return quizItem;
    }

    public void updateQuizItem(String title, String content, String limitTime,QuizType type, String point, String pointType, String image){
        this.title= title;
        this.content = content;
        this.limitTime = limitTime;
        this.type = type;
        this.point = point;
        this.pointType  = pointType;
        this.image = image;

    }

}
