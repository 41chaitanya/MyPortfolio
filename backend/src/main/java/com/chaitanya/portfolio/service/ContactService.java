package com.chaitanya.portfolio.service;

import com.chaitanya.portfolio.dto.ContactRequest;
import com.chaitanya.portfolio.model.ContactMessage;
import com.chaitanya.portfolio.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ContactService {

    private final ContactMessageRepository contactMessageRepository;
    private final EmailService emailService;

    public ContactMessage saveAndSendMessage(ContactRequest request) {
        // Save to database
        ContactMessage message = new ContactMessage(
            request.getName(),
            request.getEmail(),
            request.getMessage()
        );
        ContactMessage saved = contactMessageRepository.save(message);
        log.info("Contact message saved with id: {}", saved.getId());
        
        // Send email notification
        try {
            emailService.sendContactEmail(
                request.getName(),
                request.getEmail(),
                request.getMessage()
            );
        } catch (Exception e) {
            log.warn("Email sending failed but message was saved: {}", e.getMessage());
        }
        
        return saved;
    }

    public List<ContactMessage> getAllMessages() {
        return contactMessageRepository.findAllByOrderByCreatedAtDesc();
    }

    public List<ContactMessage> getUnreadMessages() {
        return contactMessageRepository.findByReadFalse();
    }

    public ContactMessage markAsRead(String id) {
        ContactMessage message = contactMessageRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Message not found"));
        message.setRead(true);
        return contactMessageRepository.save(message);
    }
}
