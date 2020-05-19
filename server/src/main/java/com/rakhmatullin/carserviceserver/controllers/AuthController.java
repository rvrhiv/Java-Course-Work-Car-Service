package com.rakhmatullin.carserviceserver.controllers;

import com.rakhmatullin.carserviceserver.entity.AuthRequest;
import com.rakhmatullin.carserviceserver.entity.User;
import com.rakhmatullin.carserviceserver.repository.UserRepository;
import com.rakhmatullin.carserviceserver.security.jwt.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
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

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager,
                          JwtTokenProvider jwtTokenProvider,
                          UserRepository userRepository,
                          PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/signin")
    public ResponseEntity signIn(@RequestBody AuthRequest request) {
        try {
            String name = request.getUsername();
            User user = userRepository.findByUsername(name)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                throw new BadCredentialsException("Invalid username or password");
            }

            String token = jwtTokenProvider.createToken(name, user.getRoles());

            Map<Object, Object> model = new HashMap<>();
            model.put("username", name);
            model.put("token", token);

            return ResponseEntity.ok(model);
        } catch (AuthenticationException exception) {
            throw new BadCredentialsException("Invalid username or password");
        }
    }
}
