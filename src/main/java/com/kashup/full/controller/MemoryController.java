package com.kashup.full.controller;

import com.kashup.full.model.Memory;
import com.kashup.full.repository.MemoryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/memories")
@CrossOrigin(origins = "*")
public class MemoryController {

    private final MemoryRepository memoryRepository;

    public MemoryController(MemoryRepository memoryRepository) {
        this.memoryRepository = memoryRepository;
    }

    @GetMapping
    public ResponseEntity<List<Memory>> getMemories() {
        List<Memory> list = memoryRepository.findAllByOrderByCreatedAtDesc();
        if (list.isEmpty()) {
            // Seed initial aesthetic memories
            seedDefaultMemories();
            list = memoryRepository.findAllByOrderByCreatedAtDesc();
        }
        return ResponseEntity.ok(list);
    }

    @PostMapping
    public ResponseEntity<Memory> createMemory(@RequestBody Memory memory) {
        if (memory.getTitle() == null || memory.getTitle().trim().isEmpty()) {
            memory.setTitle("Special Moment");
        }
        Memory saved = memoryRepository.save(memory);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<Memory> likeMemory(@PathVariable Long id) {
        return memoryRepository.findById(id).map(mem -> {
            mem.setLikes(mem.getLikes() + 1);
            return ResponseEntity.ok(memoryRepository.save(mem));
        }).orElse(ResponseEntity.notFound().build());
    }

    private void seedDefaultMemories() {
        memoryRepository.save(new Memory(
            "Prismatic Starlight",
            "Under the deep Obsidian night, your laughter shines brighter than any RGB dispersion beam.",
            "/assets/prismatic_portrait.jpg",
            "Special Moment"
        ));
        memoryRepository.save(new Memory(
            "Midnight Coffee & Code",
            "Late nights building dreams together — where code meets pure affection.",
            "/assets/coffee_memory.jpg",
            "Late Night"
        ));
        memoryRepository.save(new Memory(
            "September 4th Promise",
            "A date etched into the stars. The beginning of something timeless.",
            "/assets/september4_memory.jpg",
            "Birthday Special"
        ));
        memoryRepository.save(new Memory(
            "The Prism Glow",
            "Glass cubes refract the light, but you are the color in my universe.",
            "/assets/prism_glow.jpg",
            "Romantic"
        ));
    }
}
