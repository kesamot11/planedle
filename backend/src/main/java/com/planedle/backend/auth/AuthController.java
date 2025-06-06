package com.planedle.backend.auth;

import com.planedle.backend.dto.AuthResponse;
import com.planedle.backend.dto.LoginRequest;
import com.planedle.backend.dto.RegisterRequest;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody RegisterRequest registerRequest) {
        authService.register(registerRequest);
        return ResponseEntity.ok("User created successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest loginRequest,
                                        HttpServletResponse response) {
        AuthResponse authResponse = authService.login(loginRequest);
        String jwt = authResponse.token();

        Cookie cookie = new Cookie("jwt", jwt);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(24 * 60 * 60);
        response.addCookie(cookie);

        return ResponseEntity.ok(new AuthResponse("Login successfull"));
    }
}
