package com.rakhmatullin.carserviceserver.controllers;

import com.rakhmatullin.carserviceserver.entity.AuthRequest;
import com.rakhmatullin.carserviceserver.repository.UserRepository;
import com.rakhmatullin.carserviceserver.security.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(path = "/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;

    private final JwtTokenProvider jwtTokenProvider;

    private final UserRepository userRepository;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, JwtTokenProvider jwtTokenProvider, UserRepository userRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userRepository = userRepository;
    }

    @PostMapping("/signin")
    public ResponseEntity signIn(@RequestBody AuthRequest request) {
        try {
            String name = request.getUsername();
            String token = jwtTokenProvider.createToken(
                    name,
                    userRepository.findByUsername(name)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found"))
                            .getRoles()
            );
            Map<Object, Object> model = new HashMap<>();
            model.put("username", name);
            model.put("token", token);

            return ResponseEntity.ok(model);
        } catch (AuthenticationException exception) {
            throw new BadCredentialsException("Invalid username or password");
        }
    }
}
