package com.planedle.backend.service;

import com.planedle.backend.dto.GuessDTO;
import com.planedle.backend.dto.UserDTO;
import com.planedle.backend.model.User;
import com.planedle.backend.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserRepository getUserRepository() {
        return userRepository;
    }

    public void setUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDTO> getUsers() {
        return userRepository.findAll().stream()
                .map(u -> new UserDTO(u.getId(), u.getUsername(), u.getEmail(), u.getCorrectGuesses()))
                .toList();
    }

    public UserDTO findByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserDTO(user.getId(), user.getUsername(), user.getEmail(), user.getCorrectGuesses());
    }

    @Transactional
    public UserDTO incrementById(Long id) {
        int updated = userRepository.incrementGuesses(id);
        if (updated == 0) throw new EntityNotFoundException("User not found: " + id);
        User user = userRepository.findById(id).orElseThrow();
        return new UserDTO(user.getId(), user.getUsername(), user.getEmail(), user.getCorrectGuesses());
    }

    public List<GuessDTO> getMostCorrectGuesses() {
        List<User> top10 = userRepository.findTop10UsersByGuesses(PageRequest.of(0, 10));
        return top10.stream()
                .map(u -> new GuessDTO(u.getUsername(), u.getCorrectGuesses()))
                .toList();
    }
}
