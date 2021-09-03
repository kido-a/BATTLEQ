package com.battleq.member.service;

import com.battleq.config.jwt.JwtTokenProvider;
import com.battleq.member.domain.dto.request.LoginDto;
import com.battleq.member.domain.dto.request.MemberDto;
import com.battleq.member.domain.dto.request.RegistDto;
import com.battleq.member.domain.dto.request.TokenDto;
import com.battleq.member.domain.dto.response.MemberResponse;
import com.battleq.member.domain.entity.Member;
import com.battleq.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.security.core.Authentication;
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
    public String registMember(RegistDto dto) throws Exception {
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
    public TokenDto validateLogin(LoginDto dto) throws Exception {
        Optional<Member> result = memberRepository.findMemberByEmail(dto.getEmail());
        if (result.isPresent()) {
            Member member = result.get();
            if (!passwordEncoder.matches(dto.getPwd(), member.getPwd())) {
                return new TokenDto(null, "비밀번호가 다릅니다.");
            }
            String accessToken = jwtTokenProvider.createToken(member.getEmail(),member.getNickname(),Arrays.asList(member.getConvertAuthority()));
            return new TokenDto(accessToken, "로그인 성공");
        } else {
            return new TokenDto(null, "해당 회원은 존재하지 않습니다.");
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
        try {
            ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
            Date accessTokenExpireDate = jwtTokenProvider.getExpireDate(token);
            valueOperations.set(token, token, accessTokenExpireDate.getTime() - System.currentTimeMillis(), TimeUnit.MILLISECONDS);
            SecurityContextHolder.clearContext();
            return true;
        } catch (Exception e) {
            return false;
        }
    }
    /**
     * 회원삭제
     */
    public MemberResponse deleteMember(String email) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentEmail = authentication.getName();
        if (!currentEmail.equals(email)) {
            return new MemberResponse("현재 본인 계정이 아닙니다.",false);
        }
        Optional<Member> member = memberRepository.findMemberByEmail(email);
        if (member.isPresent()) {
            try {
                memberRepository.delete(member.get());
                return new MemberResponse("삭제 되었습니다.",true);
            } catch (Exception e) {
                e.printStackTrace();
                return new MemberResponse("삭제 도중 오류가 발생하였습니다.",false);
            }
        } else {
            return new MemberResponse("해당 회원이 존재하지 않습니다.",false);
        }
    }


}
