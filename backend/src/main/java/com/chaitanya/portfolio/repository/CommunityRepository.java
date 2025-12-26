package com.chaitanya.portfolio.repository;

import com.chaitanya.portfolio.model.Community;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CommunityRepository extends MongoRepository<Community, String> {
    Optional<Community> findBySlug(String slug);
}
