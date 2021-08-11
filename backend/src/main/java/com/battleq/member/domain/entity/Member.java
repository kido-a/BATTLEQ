package com.battleq.member.domain.entity;

import com.battleq.member.domain.dto.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "battle_member")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, length = 50)
    private String userName;
    @Column(unique = true,length = 500)
    private String email;
    @Column(length = 500)
    private String pwd;
    @Column
    @ColumnDefault("current_timestamp()")
    private LocalDateTime regDate;
    @Column
    @ColumnDefault("current_timestamp()")
    private LocalDateTime modDate;
    @Enumerated(EnumType.STRING)
    @Column
    private EmailAuth emailAuth;
    @Column(length = 100, nullable = false)
    private String nickname;
    @Column
    private Long profileImg;
    @Column
    private String userInfo;
    @Enumerated(EnumType.STRING)
    @Column
    private Authority authority;



    public void updateEmailAuth(EmailAuth auth) {
        this.emailAuth = auth;
    }

    public void updateMemberInfo(MemberDto dto) {
        this.userName = dto.getUserName();
        this.pwd = dto.getPwd();
        this.modDate = LocalDateTime.now();
        this.nickname = dto.getNickname();
        this.userInfo = dto.getUserInfo();
    }

    public GrantedAuthority getConvertAuthority() {
        return new SimpleGrantedAuthority(this.authority.toString());
    }
}


