package com.example.divelog.Controller;

import com.example.divelog.model.User;
import com.example.divelog.service.UserService;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Data
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping
    public List<User> findAll(){
        return userService.findAll();
    }

    @GetMapping("/{id}")
    public Optional<User> findOne(@PathVariable String id){
        return userService.findOne(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void save(@RequestBody User user){
        userService.save(user);
    }

    @PostMapping("/{id}")
    public User update(@RequestBody User user, @PathVariable String id){
        return userService.update(user, id);
    }
}
