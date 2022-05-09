package com.example.Repository;

import com.example.Entity.Quiz;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ElasticSearchRepository extends ElasticsearchRepository<Quiz,Long> {
    Quiz findByQuestion(String question);
}
