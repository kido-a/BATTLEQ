package com.battleq.member.domain.dto.request;

import com.battleq.member.domain.dto.response.MemberResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class TokenDto {
    private String token;
    private String message;

    public MemberResponse toResponse() {
        return MemberResponse.builder()
                .message(this.message)
                .data(this.token)
                .build();
    }
}
