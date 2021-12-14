package com.battleq.config.redis;

import com.battleq.play.domain.dto.GradingMessage;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jdk8.Jdk8Module;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;
import redis.embedded.RedisServer;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.io.File;
import java.io.IOException;

@Slf4j
@Profile("local")
@Configuration
public class LocalRedisConfig {
    @Value("${spring.redis.port}")
    private int redisPort;

    private RedisServer redisServer;

    @PostConstruct
    public void redisServer() throws Exception {
        if (isArmMac()) {
            redisServer = new RedisServer(getRedisFileForArmMac(),redisPort);
        } else {
            redisServer = new RedisServer(redisPort);
        }
        redisServer.start();
    }

    @PreDestroy
    public void stopRedis() throws Exception {
        if (redisServer != null) {
            redisServer.stop();
        }
    }
    private boolean isArmMac() throws Exception {
        return System.getProperty("os.arch").equals("aarch64") &&
                System.getProperty("os.name").equals("Mac OS X");
    }

    private File getRedisFileForArmMac() throws IOException{
        File file = new ClassPathResource("redis/redis-server-m1-mac").getFile();
        return file;
    }
    @Bean public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS); // timestamp 형식 안따르도록 설정
        mapper.registerModules(new JavaTimeModule(), new Jdk8Module()); // LocalDateTime 매핑을 위해 모듈 활성화
        return mapper;
    }
    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        return new LettuceConnectionFactory();  // Lettuce 사용
    }

    @Bean
    public RedisTemplate<String, GradingMessage> redisTemplate() {
        RedisTemplate<String, GradingMessage> redisTemplate = new RedisTemplate<>();
        redisTemplate.setConnectionFactory(redisConnectionFactory());
        redisTemplate.setKeySerializer(new StringRedisSerializer());   // Key: String
        redisTemplate.setValueSerializer(new GenericJackson2JsonRedisSerializer(objectMapper()));  // Value: 직렬화에 사용할 Object 사용하기
        return redisTemplate;
    }

}
