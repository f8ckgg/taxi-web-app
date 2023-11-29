package com.example.taxi.dto;
import com.example.taxi.entity.Car;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RoadDTO {
    private Long id;

    private String startLocation;

    private String endLocation;

    private boolean accepted;

    private boolean finished;

    private CarDTO car;

    private UserDTO user;

    private UserDTO driver;

}
