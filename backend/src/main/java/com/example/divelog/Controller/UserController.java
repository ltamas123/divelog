package com.example.divelog.Controller;

import com.example.divelog.model.User;
import com.example.divelog.service.UserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Data
@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final UserService userService;

    @GetMapping
    public List<User> findAll() {

        return userService.findAll();
    }

//    @GetMapping("/1")
//    public String getUserId(@RequestHeader (name="Authorization") String s){
//        return userService.getUserId(s);
//
//    }

    @GetMapping("/{id}")
    public Optional<User> findOne(@PathVariable String id) {
        return userService.findOne(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void save(@RequestBody User user) {
        userService.save(user);
    }

    @PostMapping("/{id}")
    public User update(@RequestBody User user, @PathVariable String id) {
        return userService.update(user, id);
    }


    @PutMapping("/follow/{id}")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public User follow(@PathVariable String id, @RequestParam(name = "id") String followedUserId) {
        return userService.follow(id, followedUserId);
    }

}