package com.kashup.full.service;

import com.kashup.full.model.ChatMessage;
import com.kashup.full.repository.ChatMessageRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;

    public ChatService(ChatMessageRepository chatMessageRepository) {
        this.chatMessageRepository = chatMessageRepository;
    }

    public ChatMessage sendMessage(String sender, String recipient, String content) {
        if (content == null || content.trim().isEmpty()) {
            throw new IllegalArgumentException("Message content cannot be empty.");
        }
        ChatMessage message = new ChatMessage(sender.toLowerCase(), recipient.toLowerCase(), content.trim());
        return chatMessageRepository.save(message);
    }

    public List<ChatMessage> getActiveMessages() {
        LocalDateTime cutoff = LocalDateTime.now().minusDays(2);
        return chatMessageRepository.findAllByCreatedAtAfterOrderByCreatedAtAsc(cutoff);
    }

    /**
     * Purge messages older than 2 days (48 hours).
     * Runs every 5 minutes.
     */
    @Scheduled(fixedRate = 300000)
    public void purgeOldMessages() {
        LocalDateTime cutoff = LocalDateTime.now().minusDays(2);
        int deletedCount = chatMessageRepository.deleteByCreatedAtBefore(cutoff);
        if (deletedCount > 0) {
            System.out.println("[ChatService] Purged " + deletedCount + " expired messages (older than 2 days).");
        }
    }
}
