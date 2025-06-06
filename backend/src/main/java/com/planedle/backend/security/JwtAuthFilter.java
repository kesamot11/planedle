package com.planedle.backend.security;

import com.planedle.backend.auth.JwtService;
import com.planedle.backend.model.User;
import com.planedle.backend.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    public JwtAuthFilter(final JwtService jwtService, final UserRepository userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        String authHeader = null;
        if(request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if("jwt".equals(cookie.getName())) {
                    authHeader = cookie.getValue();
                    break;
                }
            }
        }
        final String userEmail;

        if(authHeader == null) {
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = authHeader;

        jwt = authHeader.substring(7); // Bearer gone
        userEmail = jwtService.extractEmail(jwt);

        if(userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            User user = userRepository.findByEmail(userEmail)
                    .orElse(null);

            if(user != null && jwtService.isTokenValid(jwt)) {
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(user, null, null);

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }

}

