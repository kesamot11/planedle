package com.planedle.backend.auth;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

@Service
public class JwtService {

    private static final String SECRET_KEY = "supersecretjwtkey1234567890!@#$%^&*()";
    private static final long EXPIRATION = 1000 * 60 * 60 * 24; // 24 hours

    private Key getSignKey() {
        // Generate key with HMAC-SHA256 algorithm
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String generateToken(String email) {
        return Jwts.builder() // New JWT
                .setSubject(email) // email in the subject
                .setIssuedAt(new Date()) // set issue date
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION)) // set expiration 24 hours from now
                .signWith(getSignKey(), SignatureAlgorithm.HS256) // sign the token with our generated key
                .compact(); // make the jwt a string
    }

    /**
     * Extract the email from a jwt token
     * @param token
     * @return
     */
    public String extractEmail(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean isTokenValid(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSignKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch(JwtException e) {
            return false;
        }
    }
}

