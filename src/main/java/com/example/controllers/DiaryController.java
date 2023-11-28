package com.example.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.HttpStatus;
import com.example.models.Diary;
import com.example.repositories.DiaryRepository;

@RestController
@RequestMapping("/api")
public class DiaryController {

    @Autowired
    private DiaryRepository diaryRepository;

    @PostMapping("/diary")
    public ResponseEntity<Object> createDiary(@RequestBody Diary diary) {
        try {
            Diary savedDiary = diaryRepository.save(diary);
            return ResponseEntity.ok(savedDiary);
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception for debugging purposes
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create diary. Please try again.");
        }
    }
}