package com.kashup.full.controller;

import com.kashup.full.model.ChatMessage;
import com.kashup.full.service.ChatService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @GetMapping("/messages")
    public ResponseEntity<List<ChatMessage>> getMessages() {
        return ResponseEntity.ok(chatService.getActiveMessages());
    }

    @PostMapping("/send")
    public ResponseEntity<ChatMessage> sendMessage(@RequestBody Map<String, String> payload) {
        String sender = payload.getOrDefault("sender", "dev");
        String recipient = payload.getOrDefault("recipient", "kashish");
        String content = payload.get("content");

        ChatMessage message = chatService.sendMessage(sender, recipient, content);
        return ResponseEntity.ok(message);
    }

    @GetMapping("/info")
    public ResponseEntity<Map<String, Object>> getChatInfo() {
        Map<String, Object> info = new HashMap<>();
        info.put("retentionPeriodDays", 2);
        info.put("retentionPeriodHours", 48);
        info.put("participants", List.of("dev", "kashish"));
        info.put("description", "Messages are automatically destroyed after 48 hours to preserve intimacy and privacy.");
        return ResponseEntity.ok(info);
    }
}
