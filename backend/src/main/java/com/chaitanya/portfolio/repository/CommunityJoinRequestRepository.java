package com.chaitanya.portfolio.repository;

import com.chaitanya.portfolio.model.CommunityJoinRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CommunityJoinRequestRepository extends MongoRepository<CommunityJoinRequest, String> {
    List<CommunityJoinRequest> findByCommunityName(String communityName);
    List<CommunityJoinRequest> findByStatus(String status);
    List<CommunityJoinRequest> findByEmail(String email);
    List<CommunityJoinRequest> findAllByOrderByCreatedAtDesc();
}
