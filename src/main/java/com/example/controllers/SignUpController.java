package com.example.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.models.User;
import com.example.repositories.UserRepository;

@RestController
public class SignUpController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User user) {
        // password encryption, entry validation, checking if user already exists
        userRepository.save(user);
        return ResponseEntity.ok("User has been registered.");
    }
}