package com.example.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
import java.util.ArrayList;

//@Document annotation to specify the collection
@Document(collection="diaries")
public class Diary {

    //setting up the fields including @Id annotation; marks it as primary key
    @Id
    private String id;
    private String gameTitle;
    private List<String> sections;

    // default no-argument constructor
    public Diary() {
    }

    //constructor
    public Diary(String gameTitle) {
        this.gameTitle = gameTitle;
    }

    //getters and setters
    //id
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }

    //gameTitle
    public String getGameTitle() {
        return gameTitle;
    }
    public void setGameTitle(String gameTitle) {
        this.gameTitle = gameTitle;
    }

    public List<String> getSections() {
        return sections;
    }

    public void setSections(List<String> sections) {
        this.sections = sections;
    }
}
