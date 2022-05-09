package com.battleq.crossword.controlloer;

import com.battleq.crossword.domain.dto.request.CWRequestDto;
import com.battleq.crossword.domain.dto.response.CWResponseDto;
import com.battleq.crossword.domain.entity.CrossWord;
import com.battleq.crossword.service.ElasticSearchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class CrossWordController {
    private final ElasticSearchService elasticSearchService;

    /**
     * 문제 생성
     */
    @PostMapping("/crossword/regist")
    @Transactional
    public ResponseEntity<CWResponseDto> registQuestion(@RequestBody CWRequestDto dto) throws Exception {
        elasticSearchService.regist(dto);
        CWResponseDto cwResponseDto = new CWResponseDto("입력",null);
        return new ResponseEntity<CWResponseDto>(cwResponseDto, HttpStatus.CREATED);
    }

    /**
     * 문제 가져오기
     */
    @GetMapping("/crossword/{word}")
    public ResponseEntity<CWResponseDto> getQuestion(@PathVariable("word") String word)
    {
        List<CrossWord> crossWord = elasticSearchService.get(word);
        System.out.println(crossWord.toString());
        return ResponseEntity.ok(CWResponseDto.of("조회",crossWord));
    }
}
