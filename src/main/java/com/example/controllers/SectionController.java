package com.example.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.HttpStatus;
import com.example.models.Section;
import com.example.repositories.SectionRepository;

@RestController
@RequestMapping("/api")
public class SectionController {

    @Autowired
    private SectionRepository sectionRepository;

    @PostMapping("/section")
    public ResponseEntity<Object> createSection(@RequestBody Section section) {
        try {
            Section savedSection = sectionRepository.save(section);
            return ResponseEntity.ok(savedSection);
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception for debugging purposes
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create section. Please try again.");
        }
    }
}