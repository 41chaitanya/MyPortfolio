package com.chaitanya.portfolio.service;

import com.chaitanya.portfolio.model.OtpToken;
import com.chaitanya.portfolio.repository.OtpTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class OtpService {

    private final OtpTokenRepository otpTokenRepository;
    private final EmailService emailService;
    
    private static final SecureRandom random = new SecureRandom();

    public String generateAndSendOtp(String email, String communitySlug, String communityName) {
        // Delete any existing OTPs for this email
        otpTokenRepository.deleteByEmail(email);
        
        // Generate 6-digit OTP
        String otp = String.format("%06d", random.nextInt(1000000));
        
        // Save OTP to database
        OtpToken otpToken = new OtpToken(email, otp, communitySlug);
        otpTokenRepository.save(otpToken);
        
        // Send OTP via email
        emailService.sendOtpEmail(email, otp, communityName);
        
        log.info("OTP generated and sent for email: {}", email);
        return otp;
    }

    public Optional<OtpToken> verifyOtp(String email, String otp, String communitySlug) {
        Optional<OtpToken> tokenOpt = otpTokenRepository
            .findByEmailAndOtpAndCommunitySlugAndUsedFalse(email, otp, communitySlug);
        
        if (tokenOpt.isPresent()) {
            OtpToken token = tokenOpt.get();
            if (!token.isExpired()) {
                // Mark as used
                token.setUsed(true);
                otpTokenRepository.save(token);
                return Optional.of(token);
            }
        }
        return Optional.empty();
    }
}
