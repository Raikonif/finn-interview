package com.excercise.finnback.repository;

import com.excercise.finnback.document.UserDocument;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserMongoRepository extends MongoRepository<UserDocument, String> {
    void deleteByRelationalId(Long relationalId);
}