package com.battleq.member.domain.dto;

import com.battleq.member.domain.entity.Authority;
import com.battleq.member.domain.entity.EmailAuth;
import com.battleq.member.domain.entity.Member;
import lombok.*;


@Getter
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class MemberDto {
    private String userName;
    private String email;
    private String pwd;
    private EmailAuth emailAuth;
    private String nickname;
    private String userInfo;
    private Authority authority;


    public void updateEmailAuth(EmailAuth emailAuth) {
        this.emailAuth = emailAuth;
    }

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
                .emailAuth(emailAuth)
                .nickname(nickname)
                .userInfo(userInfo)
                .authority(authority)
                .build();
    }
}
