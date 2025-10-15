package com.planedle.backend.controller;

import com.planedle.backend.dto.GuessDTO;
import com.planedle.backend.dto.UserDTO;
import com.planedle.backend.model.User;
import com.planedle.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    public UserService getUserService() {
        return userService;
    }

    public void setUserService(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<UserDTO>> getUsers() {
        return ResponseEntity.ok(userService.getUsers());
    }

    @GetMapping("/me")
    public ResponseEntity<UserDTO> me(@AuthenticationPrincipal User user) {
        UserDTO userDTO = userService.findByUsername(user.getUsername());
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping("/increment/{id}")
    public ResponseEntity<UserDTO> increment(@PathVariable Long id) {
        return ResponseEntity.ok(userService.incrementById(id));
    }

    @GetMapping("/top-users")
    public ResponseEntity<List<GuessDTO>> getTop10Users() {
        return ResponseEntity.ok(userService.getMostCorrectGuesses());
    }

}
