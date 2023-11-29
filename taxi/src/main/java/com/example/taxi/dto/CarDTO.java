package com.example.taxi.dto;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CarDTO {
    private Long id;

    private String make;

    private String model;

    private int year;

    private String licensePlate;

    private UserDTO driver;
}
