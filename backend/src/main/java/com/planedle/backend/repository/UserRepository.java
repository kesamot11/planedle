package com.planedle.backend.repository;

import com.planedle.backend.model.User;
import jakarta.persistence.Cacheable;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;

@Cacheable
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String username);
    Optional<User> findByUsername(String username);
    @Modifying
    @Query("update User u set u.correctGuesses = u.correctGuesses + 1 where u.id = :id")
    int incrementGuesses(Long id);

    @Query("select u from User u where u.correctGuesses > 0 order by u.correctGuesses desc limit 10")
    List<User> findTop10UsersByGuesses(Pageable pageable);
}
