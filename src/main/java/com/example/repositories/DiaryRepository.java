package com.example.repositories;

//inheriting MongoRepository allows DiaryRepository to have several methods for interacting with the database
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.models.Diary;

@Repository
//for Diary entities, ID type is String
public interface DiaryRepository extends MongoRepository<Diary, String> {

}