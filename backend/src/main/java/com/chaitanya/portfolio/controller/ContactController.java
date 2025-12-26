package com.chaitanya.portfolio.controller;

import com.chaitanya.portfolio.dto.ApiResponse;
import com.chaitanya.portfolio.dto.ContactRequest;
import com.chaitanya.portfolio.model.ContactMessage;
import com.chaitanya.portfolio.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    public ResponseEntity<ApiResponse> submitContact(@Valid @RequestBody ContactRequest request) {
        try {
            ContactMessage message = contactService.saveAndSendMessage(request);
            return ResponseEntity.ok(ApiResponse.success("Message sent successfully!", message));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to send message: " + e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<ApiResponse> getAllMessages() {
        List<ContactMessage> messages = contactService.getAllMessages();
        return ResponseEntity.ok(ApiResponse.success("Messages retrieved", messages));
    }

    @GetMapping("/unread")
    public ResponseEntity<ApiResponse> getUnreadMessages() {
        List<ContactMessage> messages = contactService.getUnreadMessages();
        return ResponseEntity.ok(ApiResponse.success("Unread messages retrieved", messages));
    }

    @PutMapping("/{id}/read")
    public ResponseEntity<ApiResponse> markAsRead(@PathVariable String id) {
        try {
            ContactMessage message = contactService.markAsRead(id);
            return ResponseEntity.ok(ApiResponse.success("Message marked as read", message));
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to update message: " + e.getMessage()));
        }
    }
}
