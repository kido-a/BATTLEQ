package com.battleq.config;

import com.battleq.config.jwt.JwtAuthFilter;
import com.battleq.config.jwt.JwtTokenProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity

public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private final JwtTokenProvider jwtTokenProvider;
    private final Environment env;
    public SecurityConfig(JwtTokenProvider jwtTokenProvider, Environment env) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.env = env;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        if (isLocalMode()) {
            setLocalMode(http);
        } else {
            setProdMode(http);
        }
    }
    private boolean isLocalMode() {
        String profile = env.getActiveProfiles().length > 0 ? env.getActiveProfiles()[0] : "";
        return profile.equals("local");
    }

    private void setLocalMode(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .httpBasic().disable();

        http
                .headers()
                .frameOptions()
                .sameOrigin();

        http
                .authorizeRequests()
                .antMatchers("/h2-console/*").anonymous()
                .antMatchers("/member/login").anonymous()
                .antMatchers("/member/regist").anonymous()
                .antMatchers("/member/validate/**").anonymous()
                .antMatchers("/member/detail/*").hasAnyRole("STUDENT","TEACHER","ADMIN")
                .antMatchers("/v2/api-docs").anonymous()
                .antMatchers("/swagger-resources/**").anonymous()
                .antMatchers("/webjars/**").anonymous()
                .antMatchers("/swagger/**").anonymous()
                .antMatchers("/swagger-ui/**").anonymous()
                .antMatchers("/api/**").anonymous()

                .anyRequest().authenticated()
                .and()
                .formLogin().disable()
                .addFilterBefore(new JwtAuthFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);
    }

    private void setProdMode(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .httpBasic().disable();

        http
                .authorizeRequests()
                .antMatchers("/member/login").anonymous()
                .antMatchers("/member/regist").anonymous()
                .antMatchers("/member/validate/**").anonymous()
                .antMatchers("/member/detail/*").hasAnyRole("STUDENT","TEACHER","ADMIN")
                .anyRequest().authenticated()
                .and()
                .formLogin().disable()
                .addFilterBefore(new JwtAuthFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}