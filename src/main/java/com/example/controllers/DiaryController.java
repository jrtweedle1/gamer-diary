package com.example.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.HttpStatus;
import com.example.models.Diary;
import com.example.models.User;
import com.example.repositories.DiaryRepository;
import com.example.repositories.UserRepository;
import com.example.security.JwtUtil;
import java.util.List;
import java.util.ArrayList;
import org.bson.types.ObjectId;

@RestController
@RequestMapping("/api")
public class DiaryController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private DiaryRepository diaryRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/diary")
    public ResponseEntity<Object> createDiary(
            @RequestHeader(name = "Authorization") String authorizationHeader,
            @RequestBody Diary diary) {
        try {
            String userIdString = jwtUtil.extractUserId(authorizationHeader);
            Diary savedDiary = diaryRepository.save(diary);
            ObjectId userId = new ObjectId(userIdString);
            User user = userRepository.findById(userId).orElse(null);
            if (user != null) {
                List<String> diaryIds = user.getDiaryIds();
                if (diaryIds == null) {
                    diaryIds = new ArrayList<>();
                }
                diaryIds.add(savedDiary.getId());
                user.setDiaryIds(diaryIds);
                userRepository.save(user);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("User is null");
            }
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create diary. Please try again.");
        }
    }

}