package com.example.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
import org.bson.types.ObjectId;

//@Document annotation to specify the collection
@Document(collection="users")
public class User {

    //setting up the fields including @Id annotation; marks it as primary key
    @Id
    private ObjectId id;
    private String username;
    private String password;
    private String email;
    private String token;
    private List<String> diaryIds;

    //empty constructor
    public User() {

    }

    //constructor
    public User(String username, String password, String email, String token) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.token = token;
    }

    //getters and setters
    //id
    public ObjectId getId() {
        return id;
    }
    public void setId(ObjectId id) {
        this.id = id;
    }

    //username
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }

    //password
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

    //email
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public String getToken() {
        return token;
    }
    public void setToken(String token) {
        this.token = token;
    }

    public List<String> getDiaryIds() {
        return diaryIds;
    }

    public void setDiaryIds(List<String> diaryIds) {
        this.diaryIds = diaryIds;
    }

}