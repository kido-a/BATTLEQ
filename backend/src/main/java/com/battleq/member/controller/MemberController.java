package com.battleq.member.controller;

import com.battleq.member.domain.dto.request.LoginDto;
import com.battleq.member.domain.dto.request.MemberDto;
import com.battleq.member.domain.dto.request.RegistDto;
import com.battleq.member.domain.dto.request.TokenDto;
import com.battleq.member.domain.dto.response.MemberResponse;
import com.battleq.member.domain.entity.Member;
import com.battleq.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequiredArgsConstructor
public class MemberController {
    private final Logger log = LoggerFactory.getLogger(getClass());
    private final MemberService memberService;

    /**
     * 회원가입
     */
    @PostMapping("/member/regist")
    public ResponseEntity<MemberResponse> registMember(@RequestBody RegistDto dto, @RequestParam("profile") MultipartFile file) throws Exception {
        String registEmail = memberService.registMember(dto);
        MemberResponse memberResponse;
        if (!registEmail.equals("") && registEmail != null) {
            memberResponse = new MemberResponse("정상 가입되었습니다.", registEmail);
            return new ResponseEntity<MemberResponse>(memberResponse,HttpStatus.CREATED);
        } else {
            memberResponse = new MemberResponse("회원가입이 실패하였습니다. 관리자에게 문의하시기 바랍니다.",null);
            return new ResponseEntity<MemberResponse>(memberResponse,HttpStatus.BAD_REQUEST);
        }

    }

    /**
     * 가입 가능한 E-MAIL 확인
     */
    @GetMapping("/member/validate/email/{email}")
    public ResponseEntity validateAvailableEmail(@PathVariable("email") String email) throws Exception {
        Boolean isAvailableEmail = memberService.validateAvailableEmail(email);
        if (isAvailableEmail) {
            return new ResponseEntity(HttpStatus.OK); // 200
        } else {
            return new ResponseEntity(HttpStatus.CONFLICT); // 409
        }
    }

    /**
     * 가입 가능한 닉네임 확인
     */
    @GetMapping("/member/validate/nickname/{nickName}")
    public ResponseEntity validateAvailableNickName(@PathVariable("nickName") String nickName) throws Exception {
        Boolean isAvailableNickName = memberService.validateAvailableNickName(nickName);
        if (isAvailableNickName) {
            return new ResponseEntity(HttpStatus.OK); // 200
        } else {
            return new ResponseEntity(HttpStatus.CONFLICT); // 409
        }
    }

    /**
     * 회원정보 수정
     */
    @PutMapping("/member/modify")
    public ResponseEntity<MemberResponse> modifyMemberInfo(@RequestBody MemberDto dto) throws Exception {
        String email = memberService.modifyMemberInfo(dto);
        MemberResponse memberResponse;
        if (email != null) {
            memberResponse = new MemberResponse("수정이 완료되었습니다.",email);
            return new ResponseEntity<MemberResponse>(memberResponse,HttpStatus.OK);
        } else {
            memberResponse = new MemberResponse("수정이 실패하였습니다. 관리자에게 문의하여 주시기 바랍니다.", null);
            return new ResponseEntity<MemberResponse>(memberResponse,HttpStatus.BAD_REQUEST);
        }

    }

    /**
     * 로그인
     */
    @PostMapping("/member/login")
    public ResponseEntity<MemberResponse> doLogin(@RequestBody LoginDto dto) throws Exception {
        TokenDto tokenDto = memberService.validateLogin(dto);
        MemberResponse memberResponse = tokenDto.toResponse();
        if (memberResponse.getData() != null) {
            return new ResponseEntity<MemberResponse>(memberResponse,HttpStatus.OK);
        } else {
            return new ResponseEntity<MemberResponse>(memberResponse,HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 유저 상세보기
     */
    @GetMapping("/member/detail/{email}")
    public ResponseEntity<MemberResponse> getMemberDetail(@PathVariable("email") String email) throws Exception {
        MemberDto memberDetail = memberService.getMemberDetail(email);
        MemberResponse memberResponse;
        if (memberDetail != null) {
            memberResponse = new MemberResponse(null,memberDetail);
            return new ResponseEntity<MemberResponse>(memberResponse,HttpStatus.OK);
        } else {
            memberResponse = new MemberResponse("해당 유저가 존재하지 않습니다.", null);
            return new ResponseEntity<MemberResponse>(memberResponse,HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 로그아웃
     */
    @PostMapping("/member/logout")
    public ResponseEntity<MemberResponse> doLogout(@RequestHeader("accessToken") String token) throws Exception {
        Boolean isLogout = memberService.doLogout(token);
        MemberResponse memberResponse;
        if (isLogout) {
            memberResponse = new MemberResponse( "로그아웃 되었습니다.",null);
            return new ResponseEntity<MemberResponse>(memberResponse,HttpStatus.OK);
        } else {
            memberResponse = new MemberResponse("이미 로그아웃 하셨습니다.",null);
            return new ResponseEntity<MemberResponse>(memberResponse,HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * 회원삭제
     */
    @DeleteMapping("/member/{email}")
    public ResponseEntity deleteMember(@PathVariable("email")String email) throws Exception {
        MemberResponse deletedMember = memberService.deleteMember(email);
        boolean isDeleted = (boolean)deletedMember.getData();
        if (isDeleted) {
            return new ResponseEntity<>(deletedMember.getMessage(),HttpStatus.OK);
        } else {
            return new ResponseEntity<>(deletedMember.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }

}
