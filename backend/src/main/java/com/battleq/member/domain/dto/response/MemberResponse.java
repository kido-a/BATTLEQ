package com.battleq.member.domain.dto.response;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberResponse<T> {
    private String message;
    private T data;
}
