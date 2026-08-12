package com.kashup.full.repository;

import com.kashup.full.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    List<ChatMessage> findAllByCreatedAtAfterOrderByCreatedAtAsc(LocalDateTime cutoff);

    List<ChatMessage> findAllByOrderByCreatedAtAsc();

    @Transactional
    @Modifying
    @Query("DELETE FROM ChatMessage m WHERE m.createdAt < :cutoff")
    int deleteByCreatedAtBefore(LocalDateTime cutoff);
}
