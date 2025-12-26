package com.chaitanya.portfolio.repository;

import com.chaitanya.portfolio.model.OtpToken;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface OtpTokenRepository extends MongoRepository<OtpToken, String> {
    Optional<OtpToken> findByEmailAndOtpAndCommunitySlugAndUsedFalse(String email, String otp, String communitySlug);
    void deleteByEmail(String email);
}
