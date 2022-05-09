package com.battleq.crossword.domain.emtity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.PersistenceConstructor;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;

@Document(indexName = "crossword")
@Getter
public class CrossWord {

    private String question;
    private String answer;

    public CrossWord(String question,String answer) {
       this.question = question;
       this.answer = answer;
    }
}
