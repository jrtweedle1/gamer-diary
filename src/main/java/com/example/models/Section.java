package com.example.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

//@Document annotation to specify the collection
@Document(collection="sections")
public class Section {

    //setting up the fields including @Id annotation; marks it as primary key
    @Id
    private String id;
    private String sectionTitle;
    private String sectionContent;

    private String diaryId;

    //constructor
    public Section(String sectionTitle, String sectionContent, String diaryId) {
        this.sectionTitle = sectionTitle;
        this.sectionContent = sectionContent;
        this.diaryId = diaryId;
    }

    //getters and setters
    //id
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    //sectionTitle
    public String getSectionTitle() {
        return sectionTitle;
    }

    public void setSectionTitle(String sectionTitle) {
        this.sectionTitle = sectionTitle;
    }

    //sectionContent
    public String getSectionContent() {
        return sectionContent;
    }

    public void setSectionContent(String sectionContent) {
        this.sectionContent = sectionContent;
    }

    public String getDiaryId() {
        return diaryId;
    }

    public void setDiaryId(String diaryId) {
        this.diaryId = diaryId;
    }
}