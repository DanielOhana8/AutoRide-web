package com.autoride.service;

import com.autoride.entity.Location;
import com.autoride.entity.User;
import com.autoride.repository.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public User register(User user) {
        if (userRepository.existsByEmail(user.getEmail()))
            throw new IllegalArgumentException("Email is already registered");

        String hashedPassword = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);

        return userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new EntityNotFoundException("User not exists"));
    }

    @Transactional(readOnly = true)
    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("User not exists"));
    }

    @Transactional
    public User updateUserBalance(Long id, BigDecimal amount) {
        User user = getUserById(id);
        user.setBalance(user.getBalance().add(amount));
        return userRepository.save(user);
    }

    @Transactional
    public User updateUserLocation(Long id, Location location) {
        User user = getUserById(id);
        user.setLocation(location);
        return userRepository.save(user);
    }

    @Transactional
    public void saveUser(User user) {
        userRepository.save(user);
    }
}
