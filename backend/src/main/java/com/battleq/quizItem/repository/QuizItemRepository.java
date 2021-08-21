package com.battleq.quizItem.repository;

import com.battleq.quizItem.domain.entity.QuizItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class QuizItemRepository {
    private final EntityManager em;


    public void save(QuizItem quizItem){
        if(quizItem.getId() == null){
            em.persist(quizItem);
        }else {
            em.merge(quizItem);
        }
    }

    public QuizItem findOne(Long id){
        return em.find(QuizItem.class, id);
    }

    public List<QuizItem> findAllByQuizId(Long id){
        return em.createQuery("select q from QuizItem q where q.id = :id", QuizItem.class)
                .setParameter("id",id)
                .getResultList();
    }

    public List<QuizItem> findAll(Long quizId) {
        return em.createQuery("select q from QuizItem q where q.quiz.id = :id",QuizItem.class)
                .setParameter("id",quizId)
                .getResultList();
    }
}
