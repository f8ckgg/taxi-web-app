package com.example.taxi.mapper;

import com.example.taxi.dto.RoadDTO;
import com.example.taxi.entity.Road;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoadMapper {
    RoadDTO toDTO(Road road);
    Road toEntity(RoadDTO roadDTO);
}
