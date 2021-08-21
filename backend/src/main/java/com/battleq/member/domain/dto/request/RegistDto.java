package com.battleq.member.domain.dto.request;

import com.battleq.member.domain.entity.Authority;
import com.battleq.member.domain.entity.EmailAuth;
import com.battleq.member.domain.entity.Member;
import lombok.*;


@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class RegistDto {
    private String userName;
    private String email;
    private String pwd;
    private String nickname;
    private String userInfo;
    private Authority authority;

    public void updateEncodePassword(String password) {
        this.pwd = password;
    }
    public void updateAuthority(Authority auth) {
        this.authority = auth;
    }

    public Member toEntity() {
        return Member.builder()
                .userName(userName)
                .email(email)
                .pwd(pwd)
                .emailAuth(EmailAuth.N)
                .nickname(nickname)
                .userInfo(userInfo)
                .authority(authority)
                .build();
    }
}
