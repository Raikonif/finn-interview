package com.excercise.finnback.service;

import com.excercise.finnback.dto.UserRequest;
import com.excercise.finnback.dto.UserResponse;
import com.excercise.finnback.entity.UserEntity;
import com.excercise.finnback.document.UserDocument;
import com.excercise.finnback.repository.UserPostgresRepository;
import com.excercise.finnback.repository.UserMongoRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserPostgresRepository userPostgresRepository;
    private final UserMongoRepository userMongoRepository;
    private final PasswordEncoder passwordEncoder;

    public UserResponse createUser(UserRequest request) {
        UserEntity entity = UserEntity.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

        UserEntity saved = userPostgresRepository.save(entity);

        UserDocument doc = UserDocument.builder()
                .relationalId(saved.getId())
                .fullName(saved.getFullName())
                .email(saved.getEmail())
                .build();
        userMongoRepository.save(doc);

        return toResponse(saved);
    }

    public List<UserResponse> getAllUsers() {
        return userPostgresRepository.findAll()
                .stream().map(this::toResponse).collect(Collectors.toList());
    }

    public UserResponse getUser(Long id) {
        return userPostgresRepository.findById(id)
                .map(this::toResponse)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public UserResponse updateUser(Long id, UserRequest request) {
        UserEntity user = userPostgresRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        UserEntity updated = userPostgresRepository.save(user);

        userMongoRepository.deleteByRelationalId(id);
        userMongoRepository.save(UserDocument.builder()
                .relationalId(id)
                .fullName(updated.getFullName())
                .email(updated.getEmail())
                .build());

        return toResponse(updated);
    }

    public void deleteUser(Long id) {
        userPostgresRepository.deleteById(id);
        userMongoRepository.deleteByRelationalId(id);
    }

    public void deleteUserByEmail(String email) {
        UserEntity user = userPostgresRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        userPostgresRepository.delete(user);
        userMongoRepository.deleteByRelationalId(user.getId());
    }

    public UserResponse updateUserByEmail(String email, UserRequest request) {
        UserEntity user = userPostgresRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        UserEntity updated = userPostgresRepository.save(user);

        userMongoRepository.deleteByRelationalId(user.getId());
        userMongoRepository.save(UserDocument.builder()
                .relationalId(user.getId())
                .fullName(updated.getFullName())
                .email(updated.getEmail())
                .build());

        return toResponse(updated);
    }

    public UserResponse getUserByEmail(String email) {
        return userPostgresRepository.findByEmail(email)
                .map(this::toResponse)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    private UserResponse toResponse(UserEntity entity) {
        return UserResponse.builder()
                .id(entity.getId())
                .fullName(entity.getFullName())
                .email(entity.getEmail())
                .build();
    }
}
