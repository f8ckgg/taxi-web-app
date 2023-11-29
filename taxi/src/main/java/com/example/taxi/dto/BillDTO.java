package com.example.taxi.dto;
import lombok.*;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BillDTO {
    private Long id;

    private BigDecimal amount;

    private RoadDTO road;
}
