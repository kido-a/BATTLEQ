package com.example.controller;

import com.example.Entity.Quiz;
import com.example.Repository.ESRepository;
import com.example.com.example.repository.Response.res;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class QuizController {
    @Autowired
    ESRepository ESRepository;

    @PostMapping("/saveDB")
    public ResponseEntity<res> save(){

        res r = new res();
        Quiz quiz = new Quiz();
        String temp = "abcd";
        quiz.setQuestion(temp);
        quiz.setAnswer("abcd of answer");

        ESRepository.save(quiz);

        return ResponseEntity.ok(r);
    }

    @GetMapping("/getDB/{question}")
    public ResponseEntity<Quiz> get(@PathVariable("userid") String question){

        Quiz quiz = ESRepository.findByQuestion(question);

        return ResponseEntity.ok(quiz);
    }
}
