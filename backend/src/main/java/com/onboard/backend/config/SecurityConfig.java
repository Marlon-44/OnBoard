package com.onboard.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.onboard.backend.util.ConfigAES;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;

@Configuration
public class SecurityConfig {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /*
     * @Bean
     * public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
     * http
     * .authorizeHttpRequests(auth -> auth
     * .anyRequest().authenticated())
     * .formLogin(Customizer.withDefaults())
     * .logout(Customizer.withDefaults());
     * 
     * return http.build();
     * }
     * 
     * @Bean
     * public UserDetailsService users() {
     * var user = User.withUsername("onboardAdmin")
     * .password(passwordEncoder().encode(ConfigAES.getAdminPassword()))
     * .roles("ADMIN")
     * .build();
     * return new InMemoryUserDetailsManager(user);
     * }
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll() 
                )
                .csrf(csrf -> csrf.disable());

        return http.build();
    }
}
