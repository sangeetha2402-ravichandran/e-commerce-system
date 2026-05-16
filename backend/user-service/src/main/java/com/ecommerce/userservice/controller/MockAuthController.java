package com.ecommerce.userservice.controller;

import com.ecommerce.userservice.dto.AuthRequest;
import com.ecommerce.userservice.dto.AuthResponse;
import com.ecommerce.userservice.dto.RegisterRequest;
import com.ecommerce.userservice.entity.UserRole;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class MockAuthController {

    // Simple in-memory user store for demo
    private static Map<String, Map<String, Object>> users = new HashMap<>();

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest registerRequest) {
        // Check if user already exists
        if (users.containsKey(registerRequest.getEmail())) {
            return ResponseEntity.badRequest().body(new AuthResponse("User with this email already exists"));
        }

        // Create mock user
        Map<String, Object> user = new HashMap<>();
        user.put("id", users.size() + 1L);
        user.put("name", registerRequest.getName());
        user.put("email", registerRequest.getEmail());
        user.put("password", registerRequest.getPassword()); // In real app, this would be encrypted
        user.put("role", registerRequest.getRole());
        
        users.put(registerRequest.getEmail(), user);

        // Generate mock token
        String token = "mock-jwt-token-" + System.currentTimeMillis();

        return ResponseEntity.ok(new AuthResponse(token, 
            (Long) user.get("id"), 
            (String) user.get("name"), 
            (String) user.get("email"), 
            (UserRole) user.get("role")));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest) {
        Map<String, Object> user = users.get(authRequest.getEmail());
        
        if (user == null) {
            return ResponseEntity.badRequest().body(new AuthResponse("User not found"));
        }

        // Simple password check (in real app, use proper encryption)
        if (!user.get("password").equals(authRequest.getPassword())) {
            return ResponseEntity.badRequest().body(new AuthResponse("Invalid credentials"));
        }

        // Generate mock token
        String token = "mock-jwt-token-" + System.currentTimeMillis();

        return ResponseEntity.ok(new AuthResponse(token, 
            (Long) user.get("id"), 
            (String) user.get("name"), 
            (String) user.get("email"), 
            (UserRole) user.get("role")));
    }

    @PostMapping("/validate")
    public ResponseEntity<Boolean> validateToken(@RequestParam String token) {
        // Simple validation - check if token starts with "mock-jwt-token"
        boolean isValid = token != null && token.startsWith("mock-jwt-token");
        return ResponseEntity.ok(isValid);
    }
}
