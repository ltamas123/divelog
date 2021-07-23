package com.example.divelog.dto;

import com.example.divelog.model.DiveType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder(toBuilder = true)
public class TimeLineDTO {
    private String id;
    private DiveType type;
    private String latitude;
    private String longitude;
    private double depth;
    private double duration;
    private UserDTO user;
}
