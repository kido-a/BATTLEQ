package com.battleq;

import com.battleq.member.domain.entity.Authority;
import com.battleq.member.domain.entity.EmailAuth;
import com.battleq.member.domain.entity.Member;
import com.battleq.quiz.domain.entity.Quiz;
import com.battleq.quizItem.domain.QuizType;
import com.battleq.quizItem.domain.entity.QuizItem;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;
import java.time.LocalDateTime;

@Profile("local")
@Component
@RequiredArgsConstructor
public class InitDb {


    private final InitService initService;
    @PostConstruct
    public void init(){
        initService.dbInit();
    }

    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService{

        private final EntityManager em;
        private final PasswordEncoder passwordEncoder;
        public void dbInit(){
            for(int i=0;i<5;i++){
                Member member = Member.builder()
                        .userName("test_userName"+(i+1))
                        .email("test"+(i+1)+"@naver.com")
                        .pwd(passwordEncoder.encode("test123"))
                        .regDate(LocalDateTime.now())
                        .modDate(LocalDateTime.now())
                        .emailAuth(EmailAuth.Y)
                        .nickname("test_nickName"+i)
                        .userInfo("테스트 유저입니다.")
                        .authority(Authority.ROLE_ADMIN).build();
                em.persist(member);

                Quiz quiz  = Quiz.builder()
                        .name("NO."+(i+1)+" 테스트용 Quiz ")
                        .introduction("테스트용 퀴즈입니다.")
                        .category("IT/인터넷")
                        .thumbnail("https://blog.kakaocdn.net/dn/0mySg/btqCUccOGVk/nQ68nZiNKoIEGNJkooELF1/img.jpg")
                        .view(0)
                        .member(member)
                        .build();

                em.persist(quiz);

                for(int j=0;j<3;j++) {
                    QuizItem quizItem = QuizItem.builder()
                            .title("NO."+(i+1)+"-"+ (j+1)+"테스트용 QuizItem ")
                            .content("테스트용 퀴즈 아이템 입니다.")
                            .image("http://t1.daumcdn.net/friends/prod/editor/dc8b3d02-a15a-4afa-a88b-989cf2a50476.jpg")
                            .type(QuizType.VOTE)
                            .limitTime("10")
                            .point("100")
                            .member(member)
                            .pointType("double")
                            .quiz(quiz)
                            .build();
                    em.persist(quizItem);
                }
            }



        }
    }
}