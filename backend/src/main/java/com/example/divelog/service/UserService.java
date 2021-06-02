package com.example.divelog.service;

import com.example.divelog.Repository.UserRepository;
import com.example.divelog.model.Role;
import com.example.divelog.model.User;
import lombok.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.xml.bind.ValidationException;
import java.util.List;
import java.util.Optional;


@Service
@Transactional
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public Optional<User> findOne(String id) {
        return userRepository.findById(id);
    }

    public void save(User user) {
        validate(user);
        userRepository.save(user.toBuilder()
                .role(Role.USER)
                .build());
    }

    public User update(User user, String id) {
        return userRepository.save(user.toBuilder()
                .id(id)
                .role(Role.USER)
                .build());
    }

    @SneakyThrows
    private void validate(User user) { //TODO validate more
        if(!StringUtils.hasText(user.getEmail())){
            throw new ValidationException("Missing email");
        }
        if(!StringUtils.hasText(user.getPassword())){
            throw new ValidationException("Missing password");
        }
        if(!StringUtils.hasText(user.getFullName())){
            throw new ValidationException("Missing name");
        }
    }
}
