package com.example.repositories;

//inheriting MongoRepository allows UserRepository to have several methods for interacting with the database
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.models.User;

@Repository
//for User entities, ID type is String
public interface UserRepository extends MongoRepository<User, String> {
    // insert custom query methods
}