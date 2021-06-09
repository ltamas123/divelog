package com.example.divelog.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Data
@Entity
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
public class Dive {
    @Id
    @GeneratedValue(generator = "uuid")
    @GenericGenerator(name = "uuid", strategy = "org.hibernate.id.UUIDGenerator")
    private String id;
    @Enumerated(EnumType.STRING)
    private DiveType type;
    private String latitude;
    private String longitude;
    private double depth;
    private double duration;
    @JsonInclude(JsonInclude.Include.NON_EMPTY)
    @ManyToOne
    private User user;

}
