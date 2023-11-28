package com.example.repositories;

//inheriting MongoRepository allows SectionRepository to have several methods for interacting with the database
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import com.example.models.Section;

@Repository
//for Section entities, ID type is String
public interface SectionRepository extends MongoRepository<Section, String> {

}