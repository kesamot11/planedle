package com.planedle.backend.auth;

import com.planedle.backend.dto.AuthResponse;
import com.planedle.backend.dto.LoginRequest;
import com.planedle.backend.dto.RegisterRequest;
import com.planedle.backend.model.User;
import com.planedle.backend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncode;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncode, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncode = passwordEncode;
        this.jwtService = jwtService;
    }

    public void register(RegisterRequest registerRequest) {
        if(userRepository.existsByEmail(registerRequest.email())) {
            throw new RuntimeException("Email already in use");
        }
        if(userRepository.existsByUsername(registerRequest.username())) {
            throw new RuntimeException("Username already in use");
        }
        User user = new User();
        user.setEmail(registerRequest.email());
        user.setUsername(registerRequest.username());
        user.setPassword(passwordEncode.encode(registerRequest.password()));
        user.setCorrectGuesses(0);

        userRepository.save(user);
    }

    public AuthResponse login(LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.email())
                .orElseThrow(() -> new RuntimeException("Invalid Email or Password"));
        if(!passwordEncode.matches(loginRequest.password(), user.getPassword())) {
            throw new RuntimeException("Invalid Email or Password");
        }

        String token = jwtService.generateToken(user.getEmail());
        return new AuthResponse(token);
    }
}
