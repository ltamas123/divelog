package com.example.divelog.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder(toBuilder = true)
public class UserDTO {
    private String id;
    private String fullName;

}
