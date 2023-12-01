package com.example.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import com.example.models.Diary;
import com.example.models.User;
import com.example.repositories.DiaryRepository;
import com.example.repositories.UserRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.example.security.JwtUtil;
import java.util.List;
import java.util.ArrayList;
import org.bson.types.ObjectId;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class DiaryController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private DiaryRepository diaryRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/diary/{diaryId}")
    public ResponseEntity<?> getDiaryById(@PathVariable String diaryId) {
        try {
            Optional<Diary> diary = diaryRepository.findById(diaryId);
            return diary.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to fetch diary details");
        }
    }

    @DeleteMapping("/diary/{diaryId}")
    public ResponseEntity<?> deleteDiaryById(@PathVariable String diaryId) {
        try {
            Optional<Diary> diaryOptional = diaryRepository.findById(diaryId);
            if (diaryOptional.isPresent()) {
                diaryRepository.deleteById(diaryId);
                Diary diary = diaryOptional.get();
                User user = userRepository.findByDiaryId(diaryId);
                user.getDiaryIds().remove(diaryId);
                User savedUser = userRepository.save(user);
                return ResponseEntity.ok(savedUser);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete diary details");
        }
    }

    @PostMapping("/diary")
    public ResponseEntity<Object> createDiary(
            @RequestHeader(name = "Authorization") String authorizationHeader,
            @RequestBody Diary diary) {
        try {
            String userIdString = jwtUtil.extractUserId(authorizationHeader);
            System.out.println(userIdString);
            diary.setSections(new ArrayList<>());
            Diary savedDiary = diaryRepository.save(diary);
            ObjectId userId = new ObjectId(userIdString);
            System.out.println(userId);
            User user = userRepository.findById(userId).orElse(null);
            System.out.println(user);
            if (user != null) {
                List<String> diaryIds = user.getDiaryIds();
                System.out.println(diaryIds);
                if (diaryIds == null) {
                    diaryIds = new ArrayList<>();
                }
                diaryIds.add(savedDiary.getId());
                System.out.println(diaryIds);
                user.setDiaryIds(diaryIds);
                System.out.println(user);
                userRepository.save(user);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User is null");
            }
            return ResponseEntity.ok(savedDiary);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create diary. Please try again.");
        }
    }

}