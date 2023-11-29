package com.example.taxi.mapper;

import com.example.taxi.dto.CarDTO;
import com.example.taxi.entity.Car;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CarMapper {
    CarDTO toDTO(Car car);
    Car toEntity(CarDTO carDTO);
}
