package com.example.controllers;
import com.example.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.HttpStatus;
import com.example.models.Section;
import com.example.repositories.SectionRepository;
import com.example.models.Diary;
import com.example.repositories.DiaryRepository;
import java.util.List;
import java.util.ArrayList;


@RestController
@RequestMapping("/api")
public class SectionController {

    @Autowired
    private DiaryRepository diaryRepository;

    @Autowired
    private SectionRepository sectionRepository;

    @PostMapping("/section")
    public ResponseEntity<Object> createSection(@RequestBody Section section) {
        try {
            Section newSection = sectionRepository.save(section);
            String diaryId = section.getDiaryId();
            Diary diary = diaryRepository.findById(diaryId).orElse(null);
            if (diary != null) {
                List<String> sections = diary.getSections();
                if (sections == null) {
                    sections = new ArrayList<>();
                }
                sections.add(newSection.getId());
                diary.setSections(sections);
                diaryRepository.save(diary);
                return ResponseEntity.ok(newSection);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Diary not found");
            }
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception for debugging purposes
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create section. Please try again.");
        }
    }
}