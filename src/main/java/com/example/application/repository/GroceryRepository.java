package com.example.application.repository;

import com.example.application.entity.Grocery;
import org.javers.spring.annotation.JaversSpringDataAuditable;
import org.springframework.data.mongodb.repository.MongoRepository;

@JaversSpringDataAuditable
public interface GroceryRepository extends MongoRepository<Grocery, String> {
}
