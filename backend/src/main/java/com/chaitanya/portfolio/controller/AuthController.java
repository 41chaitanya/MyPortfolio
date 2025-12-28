package com.chaitanya.portfolio.controller;

import com.chaitanya.portfolio.dto.ApiResponse;
import com.chaitanya.portfolio.dto.OtpRequest;
import com.chaitanya.portfolio.dto.VerifyOtpRequest;
import com.chaitanya.portfolio.model.Member;
import com.chaitanya.portfolio.model.OtpToken;
import com.chaitanya.portfolio.repository.MemberRepository;
import com.chaitanya.portfolio.service.JwtService;
import com.chaitanya.portfolio.service.OtpService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final OtpService otpService;
    private final JwtService jwtService;
    private final MemberRepository memberRepository;

    // Send OTP to email
    @PostMapping("/send-otp")
    public ResponseEntity<ApiResponse> sendOtp(@Valid @RequestBody OtpRequest request) {
        try {
            // Check if member exists and is approved
            Optional<Member> memberOpt = memberRepository.findByEmail(request.getEmail());
            
            if (memberOpt.isEmpty()) {
                return ResponseEntity.status(404)
                    .body(ApiResponse.error("No account found with this email. Please join the community first."));
            }
            
            Member member = memberOpt.get();
            
            if (!member.getCommunities().contains(request.getCommunitySlug())) {
                return ResponseEntity.status(403)
                    .body(ApiResponse.error("You are not a member of this community."));
            }
            
            if (!"APPROVED".equals(member.getStatus())) {
                return ResponseEntity.status(403)
                    .body(ApiResponse.error("Your membership is pending approval."));
            }
            
            // Generate and send OTP
            String communityName = request.getCommunityName() != null ? request.getCommunityName() : request.getCommunitySlug();
            otpService.generateAndSendOtp(request.getEmail(), request.getCommunitySlug(), communityName);
            
            return ResponseEntity.ok(ApiResponse.success("OTP sent to your email. Valid for 5 minutes."));
        } catch (Exception e) {
            log.error("Failed to send OTP: {}", e.getMessage());
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to send OTP: " + e.getMessage()));
        }
    }

    // Verify OTP and return JWT
    @PostMapping("/verify-otp")
    public ResponseEntity<ApiResponse> verifyOtp(@Valid @RequestBody VerifyOtpRequest request) {
        try {
            Optional<OtpToken> tokenOpt = otpService.verifyOtp(
                request.getEmail(), 
                request.getOtp(), 
                request.getCommunitySlug()
            );
            
            if (tokenOpt.isEmpty()) {
                return ResponseEntity.status(401)
                    .body(ApiResponse.error("Invalid or expired OTP. Please try again."));
            }
            
            // Get member details
            Member member = memberRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Member not found"));
            
            // Generate JWT token
            String jwt = jwtService.generateToken(
                member.getEmail(),
                member.getId(),
                member.getRole(),
                request.getCommunitySlug()
            );
            
            // Prepare response
            Map<String, Object> response = new HashMap<>();
            response.put("token", jwt);
            response.put("user", Map.of(
                "id", member.getId(),
                "name", member.getName(),
                "email", member.getEmail(),
                "role", member.getRole(),
                "image", member.getImage() != null ? member.getImage() : "",
                "teams", member.getTeams() != null ? member.getTeams() : java.util.List.of(),
                "githubUrl", member.getGithubUrl() != null ? member.getGithubUrl() : "",
                "linkedinUrl", member.getLinkedinUrl() != null ? member.getLinkedinUrl() : ""
            ));
            
            return ResponseEntity.ok(ApiResponse.success("Login successful!", response));
        } catch (Exception e) {
            log.error("OTP verification failed: {}", e.getMessage());
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Verification failed: " + e.getMessage()));
        }
    }

    // Validate JWT token
    @PostMapping("/validate")
    public ResponseEntity<ApiResponse> validateToken(@RequestHeader("Authorization") String authHeader) {
        try {
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(401).body(ApiResponse.error("Invalid token format"));
            }
            
            String token = authHeader.substring(7);
            
            if (!jwtService.isTokenValid(token)) {
                return ResponseEntity.status(401).body(ApiResponse.error("Token expired or invalid"));
            }
            
            String email = jwtService.extractEmail(token);
            String memberId = jwtService.extractMemberId(token);
            
            Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("Member not found"));
            
            Map<String, Object> userData = Map.of(
                "id", member.getId(),
                "name", member.getName(),
                "email", member.getEmail(),
                "role", member.getRole(),
                "image", member.getImage() != null ? member.getImage() : "",
                "teams", member.getTeams() != null ? member.getTeams() : java.util.List.of()
            );
            
            return ResponseEntity.ok(ApiResponse.success("Token valid", userData));
        } catch (Exception e) {
            return ResponseEntity.status(401).body(ApiResponse.error("Invalid token"));
        }
    }
}
