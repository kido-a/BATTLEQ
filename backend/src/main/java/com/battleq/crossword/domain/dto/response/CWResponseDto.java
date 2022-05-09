package com.battleq.crossword.domain.dto.response;

import com.battleq.crossword.domain.entity.CrossWord;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CWResponseDto {
    private String message;
    private List<CrossWord> data;

    public static CWResponseDto of(String message, List<CrossWord> cwlist)
    {
        CWResponseDto res = new CWResponseDto();
        res.setMessage("조회");
        res.setData(cwlist);
        return res;
    }
}
