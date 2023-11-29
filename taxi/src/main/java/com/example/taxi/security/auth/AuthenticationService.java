package com.example.taxi.security.auth;

import com.example.taxi.dto.UserDTO;
import com.example.taxi.entity.User;
import com.example.taxi.repository.UserRepository;
import com.example.taxi.security.config.JwtService;
import com.example.taxi.security.token.Token;
import com.example.taxi.security.token.TokenRepository;
import com.example.taxi.security.token.TokenType;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(UserDTO request) throws Exception {
        if (!UserDTO.isEmailValid(request.getEmail())) {
            throw new Exception("Wrong email format");
        }
        if (!UserDTO.isPasswordStrong(request.getPassword())) {
            throw new Exception("Password is not strong enough");
        }
        if (repository.findByEmail(request.getEmail()).isPresent()) {
            throw new Exception("Email already exists");
        }
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .driver(request.isDriver())
                .build();
        User savedUser = repository.save(user);
        String jwtToken = jwtService.generateToken(user);
        saveUserToken(savedUser, jwtToken);
        String role = savedUser.getAuthorities().iterator().next().getAuthority();
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(role)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        User user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        String jwtToken = jwtService.generateToken(user);
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        String role = user.getAuthorities().iterator().next().getAuthority();
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .role(role)
                .build();
    }

    private void saveUserToken(User user, String jwtToken) {
        Token token = Token.builder()
                .user(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(User user) {
        List<Token> validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }
}