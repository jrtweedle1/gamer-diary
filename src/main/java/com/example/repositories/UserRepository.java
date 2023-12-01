package com.example.repositories;

//inheriting MongoRepository allows UserRepository to have several methods for interacting with the database
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import com.example.models.User;
import org.bson.types.ObjectId;

@Repository
//for User entities, ID type is ObjectId
public interface UserRepository extends MongoRepository<User, ObjectId> {
    // insert custom query methods
    User findByUsername(String username);

    //?0 = placeholder that gets replaced with diaryId
    @Query("{ 'diaryIds': ?0 }")
    User findByDiaryId(String diaryId);
}