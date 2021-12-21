package com.battleq.quiz.service;

import com.battleq.member.domain.entity.Member;
import com.battleq.member.repository.MemberRepository;
import com.battleq.quiz.domain.dto.QuizDto;
import com.battleq.quiz.domain.dto.QuizPlayDto;
import com.battleq.quiz.domain.entity.Quiz;
import com.battleq.quiz.domain.exception.NotAuthorized;
import com.battleq.quiz.domain.exception.NotFoundMemberException;
import com.battleq.quiz.domain.exception.NotFoundQuizException;
import com.battleq.quiz.repository.QuizRepository;
import com.battleq.quizItem.domain.entity.QuizItem;
import com.battleq.quizItem.repository.QuizItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class QuizService {

    private final QuizRepository quizRepository;
    private final QuizItemRepository quizItemRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public Long saveQuiz(QuizDto quizRequest) throws NotFoundMemberException {

        Member member = foundMember(quizRequest.getMemberId()); // 유저 검증

        Quiz quiz = Quiz.initQuiz(quizRequest.getName(), quizRequest.getThumbnail(), quizRequest.getIntroduction(), quizRequest.getCategory(), member);

        quizRepository.save(quiz);
        return quiz.getId();
    }

    @Transactional
    public Long update(Long id, QuizDto quizRequest) throws Exception {

        foundMember(quizRequest.getMemberId()); // 유저 검증

        Quiz quiz = quizRepository.findOne(id);

        authorizedQuiz(quizRequest.getMemberId(),quiz); // 권한 검증

        quiz.updateQuiz(quizRequest.getName(), quizRequest.getCategory(), quizRequest.getThumbnail(), quizRequest.getIntroduction());

        return quiz.getId();
    }

    public Quiz findOne(Long quizId) throws NotFoundQuizException {
        Quiz quiz = quizRepository.findOne(quizId);
        if(quiz == null){
            throw new NotFoundQuizException("선택한 퀴즈를 찾을 수 없습니다.");
        }
        return quiz;

    }

    public List<Quiz> findAllQuiz(int offset, int limit) {
        return quizRepository.findAllWithMemberItem(offset, limit);
    }

    public Member foundMember(Long id) throws NotFoundMemberException {
        Optional<Member> member = memberRepository.findById(id);
        return member.orElseThrow(() -> new NotFoundMemberException("검색한 사용자의 데이터를 찾을 수 없습니다."));
    }

    public void findQuiz(Long id ,Quiz quiz) throws NotFoundQuizException{
        if(quiz == null){
            throw new NotFoundQuizException("검색한 퀴즈의 데이터를 찾을 수 없습니다.");
        }
    }

    public void authorizedQuiz(Long memberId, Quiz quiz) throws NotAuthorized{
        if(quiz.getMember().getId() != memberId){
            throw new NotAuthorized("사용자에 대한 권한이 없습니다.");
        }
    }

    public QuizPlayDto findOnePlayQuiz(Long quizId)throws NotFoundQuizException {
        Quiz quiz = quizRepository.findOne(quizId);

        if(quiz == null){
            throw new NotFoundQuizException("선택한 퀴즈를 찾을 수 없습니다.");
        }

        List<Long> quizItemId = quiz.getQuizItems().stream().map(QuizItem::getId).collect(Collectors.toList());


        QuizPlayDto quizPlayDto = new QuizPlayDto(quiz.getName(),quiz.getCategory(), quiz.getThumbnail(), quiz.getIntroduction(), quizItemId);
        return quizPlayDto;

    }
}
