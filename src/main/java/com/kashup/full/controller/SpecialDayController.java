package com.kashup.full.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.Month;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/special")
@CrossOrigin(origins = "*")
public class SpecialDayController {

    @GetMapping("/sept4")
    public ResponseEntity<Map<String, Object>> getSept4SpecialData(@RequestParam(value = "force", defaultValue = "false") boolean force) {
        LocalDate today = LocalDate.now();
        boolean isSept4 = force || (today.getMonth() == Month.SEPTEMBER && today.getDayOfMonth() == 4);

        Map<String, Object> response = new HashMap<>();
        response.put("isSpecialDay", isSept4);
        response.put("targetDate", "September 4th");
        response.put("title", "Happy Special Day, Kashish! ✨");
        response.put("headline", "TO THE MOST MAGNIFICENT PERSON IN MY UNIVERSE");
        response.put("subtitle", "Today, September 4th, the cosmos aligned to bring light into the world. You are the chromatic prism that turns monochrome days into vibrant magic.");
        
        response.put("wishes", List.of(
            "May your smile remain as radiant as prismatic caustics through obsidian glass.",
            "May all your wildest dreams take flight, surrounded by unconditional love and warmth.",
            "Thank you for being my anchor, my muse, and my favorite conversation every single day.",
            "Always remember: you are deeply cherished, today and for all the days to come."
        ));

        response.put("surprises", List.of(
            Map.of("code", "SECRET-01", "note", "A lifetime pass to endless hugs, warm coffee, and midnight talks."),
            Map.of("code", "SECRET-02", "note", "Every line of code in this application was crafted thinking of your smile."),
            Map.of("code", "SECRET-03", "note", "Your presence makes the ordinary feel extraordinary.")
        ));

        response.put("themeOverride", Map.of(
            "bgGradient", "linear-gradient(135deg, #101010 0%, #201a24 50%, #101010 100%)",
            "accentPrism", "RGB Dispersion Burst",
            "musicVibe", "Cinematic Ambient Bliss"
        ));

        return ResponseEntity.ok(response);
    }
}
