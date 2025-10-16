package com.excercise.finnback.controller;

import com.excercise.finnback.dto.UserRequest;
import com.excercise.finnback.dto.UserResponse;
import com.excercise.finnback.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public UserResponse getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        return userService.getUserByEmail(userDetails.getUsername());
    }

    @PostMapping
    public UserResponse create(@RequestBody UserRequest request) {
        return userService.createUser(request);
    }

    @GetMapping
    public List<UserResponse> list() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public UserResponse get(@PathVariable Long id) {
        return userService.getUser(id);
    }

    @PutMapping("/{id}")
    public UserResponse update(@PathVariable Long id, @RequestBody UserRequest request) {
        return userService.updateUser(id, request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        userService.deleteUser(id);
    }

    @DeleteMapping("/email/{email}")
    public void deleteByEmail(@PathVariable String email) {
        userService.deleteUserByEmail(email);
    }

    @PutMapping("/email/{email}")
    public UserResponse updateByEmail(@PathVariable String email, @RequestBody UserRequest request) {
        return userService.updateUserByEmail(email, request);
    }
}
