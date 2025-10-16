package com.excercise.finnback.dto;

import lombok.Data;

@Data
public class UserRequest {
    private String fullName;
    private String email;
    private String password;
}