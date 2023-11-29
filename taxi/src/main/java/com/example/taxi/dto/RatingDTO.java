package com.example.taxi.dto;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RatingDTO {
    private Long id;

    private double value;

    private String comment;

    private UserDTO user;

    private UserDTO driver;
}
