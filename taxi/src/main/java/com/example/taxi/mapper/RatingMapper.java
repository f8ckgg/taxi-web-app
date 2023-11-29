package com.example.taxi.mapper;

import com.example.taxi.dto.RatingDTO;
import com.example.taxi.entity.Rating;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RatingMapper {
    RatingDTO toDTO(Rating rating);
    Rating toEntity(RatingDTO ratingDTO);
}
