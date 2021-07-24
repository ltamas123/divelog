package com.example.divelog.service;

import com.example.divelog.Repository.UserRepository;
import com.example.divelog.model.Role;
import com.example.divelog.model.User;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.xml.bind.ValidationException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private static final String BEARER_PREFIX = "Bearer ";
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Value("${app.jwtHmac}")
    private String hmacKey;

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public Optional<User> findOne(String id) {
        return userRepository.findById(id);
    }

    public void save(User user) {
        validate(user);
        userRepository.save(user.toBuilder()
                .followedUsers(new HashSet<>())
                .followers(new HashSet<>())
                .role(Role.USER)
                .password(passwordEncoder.encode(user.getPassword()))
                .build());
    }

    public User update(User user, String id) {
        return userRepository.save(user.toBuilder()
                .id(id)
                .role(Role.USER)
                .build());
    }

    public void follow(String id, String followedUserId) {
        User user = userRepository.findById(id).orElseThrow();
        User followedUser = userRepository.findById(followedUserId).orElseThrow();
        if (user.getFollowedUsers().stream().noneMatch(userid -> userid.equalsIgnoreCase(followedUserId))) {
            user.getFollowedUsers().add(followedUserId);
            followedUser.getFollowers().add(id);
            log.info("following user {} from user {}", followedUserId, id);
        } else {
            user.getFollowedUsers().remove(followedUserId);
            followedUser.getFollowers().remove(id);
        }

    }

    @SneakyThrows
    private void validate(User user) { //TODO validate more
        if (!StringUtils.hasText(user.getEmail())) {
            throw new ValidationException("Missing email");
        }
        if (!StringUtils.hasText(user.getPassword())) {
            throw new ValidationException("Missing password");
        }
        if (!StringUtils.hasText(user.getFullName())) {
            throw new ValidationException("Missing name");
        }
    }

//    public String getUserId(String s) {
//        String authValue = s.replaceAll(BEARER_PREFIX, org.apache.commons.lang3.StringUtils.EMPTY);
//        Claims body = Jwts.parserBuilder()
//                .setSigningKey(Keys.hmacShaKeyFor(hmacKey.getBytes()))
//                .build()
//                .parseClaimsJws(authValue)
//                .getBody();
//        return userRepository.findFirstByEmail(body.getSubject()).get().getId();
//
//    }
}