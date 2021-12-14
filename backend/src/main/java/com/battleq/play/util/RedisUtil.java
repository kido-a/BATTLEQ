package com.battleq.play.util;

import com.battleq.play.domain.dto.GradingMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class RedisUtil {

    @Autowired
    SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @Autowired
    private final RedisTemplate<String, GradingMessage> listRedisTemplate;

    @Autowired
    private final RedisTemplate<String, String> userListRedisTemplate;

    @Autowired
    private final RedisTemplate<String, String> valueRedisTemplate;

    public boolean hasKey(String key){
        return stringRedisTemplate.hasKey(key);
    }

    public void setKey(String key, String value) {
        ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
        valueOperations.set(key, value);
    }
    public void deleteKey(String key) {
        stringRedisTemplate.delete(key);
    }
    public List<String> setUser(String key, String value){
        ListOperations<String, String> userListOperations = userListRedisTemplate.opsForList();
        userListOperations.rightPush(key, value);
        long size = userListOperations.size(key) == null ? 0 : userListOperations.size(key); // NPE 체크해야함.
        log.info(String.valueOf(size));
        log.info("userList = " + userListOperations.range(key, 0, size));
        return userListOperations.range(key,0,size);
    }
    public List<String> deleteUser(String key, String value){
        ListOperations<String, String> userListOperations = userListRedisTemplate.opsForList();
        userListOperations.remove(key,1,value);
        long size = userListOperations.size(key) == null ? 0 : userListOperations.size(key); // NPE 체크해야함.
        log.info(String.valueOf(size));
        log.info("userList = " + userListOperations.range(key, 0, size));
        return userListOperations.range(key,0,size);
    }
    public String getData(String key) {
        ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
        return valueOperations.get(key);
    }

    public void setData(String key, String value) {
        ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
        valueOperations.set(key, value);
    }

    public void setAnswerData(String key, GradingMessage message) {
        ListOperations<String, GradingMessage> listOperations = listRedisTemplate.opsForList();
        listOperations.rightPush(key, message);

        long size = listOperations.size(key) == null ? 0 : listOperations.size(key); // NPE 체크해야함.
        log.info(String.valueOf(size));
        log.info("operations.opsForList().range() = " + listOperations.range(key, 0, size));
    }

    public void setDataExpire(String key, String value, long duration) {
        ValueOperations<String, String> valueOperations = stringRedisTemplate.opsForValue();
        Duration expireDuration = Duration.ofSeconds(duration);
        valueOperations.set(key, value, expireDuration);
    }

    public void deleteData(String key) {
        stringRedisTemplate.delete(key);
    }

    public boolean addZdata(String key, String value, double score) {
        ZSetOperations<String, String> valueOperations = stringRedisTemplate.opsForZSet();
        return valueOperations.add(key, value, score);
    }

    public Set<ZSetOperations.TypedTuple<String>> getRanking(String key, long startIndex, long endIndex) {
        ZSetOperations<String, String> valueOpertaions = stringRedisTemplate.opsForZSet();
        return valueOpertaions.reverseRangeWithScores(key, startIndex, endIndex);
    }

    // nickname => 세션 아이디?
    public Double getScore(String key, String nickname) {
        ZSetOperations<String, String> valueOperations = stringRedisTemplate.opsForZSet();
        return valueOperations.score(key, nickname);
    }

    public Double plusScore(String key, String nickname, double score) {
        ZSetOperations<String, String> valueOperations = stringRedisTemplate.opsForZSet();
        return valueOperations.incrementScore(key, nickname, score);
    }

    public Long deleteZdata(String key, long startIndex, long endIndex) {
        ZSetOperations<String, String> valueOperations = stringRedisTemplate.opsForZSet();
        return valueOperations.removeRange(key, startIndex, endIndex);
    }

    public Long deleteZdataMember(String key, Object member) {
        ZSetOperations<String, String> valueOperations = stringRedisTemplate.opsForZSet();
        return valueOperations.remove(key, member);
    }

    public Long getZCnt(String key) {
        ZSetOperations<String, String> valueOperations = stringRedisTemplate.opsForZSet();
        return valueOperations.zCard(key);
    }

}
