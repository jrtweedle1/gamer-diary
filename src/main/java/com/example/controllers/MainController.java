package com.example.controllers;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@CrossOrigin(origins = "http://localhost:3000") //allows React to communicate with Java backend
@RestController //to define RESTful endpoints
public class MainController {

    @GetMapping("/")
    public String home() {
        return "Welcome home!";
    }

}