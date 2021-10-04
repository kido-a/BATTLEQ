package com.battleq.quiz.repository;


import com.battleq.quiz.domain.entity.Quiz;
import com.battleq.quiz.domain.exception.NotFoundQuizException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class QuizRepository {

    private final EntityManager em;

    public void save(Quiz quiz){
        if(quiz.getId() == null){
            em.persist(quiz);
        }else {
            em.merge(quiz);
        }
    }

    public Quiz findOne(Long id) {
        return em.find(Quiz.class, id);
    }

    public List<Quiz> findAll() {
    /*    QQuiz quiz = QQuiz.quiz;
        QMember member = QMember.member;

        JPAQueryFactory query = new JPAQueryFactory(em);

        return query
                .select(quiz)
                .from(quiz)
                .join(quiz.member,member)
                .where(nameLike("황호연"))
                .limit(1000)
                .fetch();*/

        return em.createQuery("select q from Quiz q",Quiz.class)
                .getResultList();
    }
  /*  private BooleanExpression nameLike(String userName){
        if(!StringUtils.hasText(userName)){
            return null;
        }
        return QMember.member.userName.like(userName);
    }*/
    public List<Quiz> findAllWithItem(){
        return em.createQuery(
                "select distinct q from Quiz q"+
                        " join fetch q.quizItems i"+
                        " join fetch i.quiz qu ", Quiz.class).getResultList();
    }
    public List<Quiz> findAllWithMemberItem(int offset, int limit){
        return em.createQuery(
                "select distinct q from Quiz q"+
                        " join fetch q.member m" ,Quiz.class).setFirstResult(offset).setMaxResults(limit).getResultList();
    }

    public List<Quiz> findAllWithMemberItem(){
        return em.createQuery(
                "select distinct q from Quiz q"+
                        " join fetch q.member m" ,Quiz.class).getResultList();
    }
}
