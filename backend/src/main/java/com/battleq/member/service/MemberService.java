package com.battleq.member.service;

import com.battleq.config.jwt.JwtTokenProvider;
import com.battleq.member.domain.dto.MemberDto;
import com.battleq.member.domain.entity.Authority;
import com.battleq.member.domain.entity.EmailAuth;
import com.battleq.member.domain.entity.Member;
import com.battleq.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Date;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final Logger log = LoggerFactory.getLogger(getClass());
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final StringRedisTemplate redisTemplate;

    /**
     * 회원가입
     */
    public String registMember(MemberDto dto) throws Exception {
        dto.updateEmailAuth(EmailAuth.N);
        dto.updateAuthority(Authority.ROLE_STUDENT);
        String encodePassword = passwordEncoder.encode(dto.getPwd());
        dto.updateEncodePassword(encodePassword);
        Member member = dto.toEntity();
        return memberRepository.save(member).getEmail();
    }

    /**
     * 가입 가능한 email 검증
     */
    public Boolean validateAvailableEmail(String email) throws Exception {
        Optional<Member> member = memberRepository.findMemberByEmail(email);
        if (member.isPresent()) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * 가입 가능한 nickname 검증
     */
    public Boolean validateAvailableNickName(String nickName) throws Exception {
        int nickNameCount = memberRepository.countMemberByNickname(nickName);
        return nickNameCount > 0 ? false : true;
    }

    /**
     * 회원 정보 수정
     */
    public String modifyMemberInfo(MemberDto dto) throws Exception {
        Optional<Member> result = memberRepository.findMemberByEmail(dto.getEmail());
        if (result.isPresent()) {
            Member member = result.get();
            if (dto.getPwd() != null && !dto.getPwd().equals("")) {
                dto.updateEncodePassword(passwordEncoder.encode(dto.getPwd()));
            }
            member.updateMemberInfo(dto);
            return memberRepository.save(member).getEmail();
        } else {
            return null;
        }
    }

    /**
     * 로그인
     */
    public String validateLogin(MemberDto dto) throws Exception {
        Optional<Member> result = memberRepository.findMemberByEmail(dto.getEmail());
        if (result.isPresent()) {
            Member member = result.get();
            if (!passwordEncoder.matches(dto.getPwd(), member.getPwd())) {
                return null;
            }
            String accessToken = jwtTokenProvider.createToken(member.getEmail(), Arrays.asList(member.getConvertAuthority()));
            return accessToken;
        } else {
            return null;
        }
    }

    /**
     * 유저 상세 보기
     */
    public MemberDto getMemberDetail(String email) throws Exception {
        Optional<Member> result = memberRepository.findMemberByEmail(email);
        if (result.isPresent()) {
            Member member = result.get();
            return MemberDto.builder()
                    .userName(member.getUserName())
                    .email(member.getEmail())
                    .nickname(member.getNickname())
                    .userInfo(member.getUserInfo())
                    .authority(member.getAuthority())
                    .build();
        } else {
            return null;
        }
    }

    /**
     * 로그아웃
     */
    public boolean doLogout(String token) throws Exception {
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
        Date accessTokenExpireDate = jwtTokenProvider.getExpireDate(token);
        valueOperations.set(token, token, accessTokenExpireDate.getTime() - System.currentTimeMillis(), TimeUnit.MILLISECONDS);
        SecurityContextHolder.clearContext();
        return true;
    }

}
