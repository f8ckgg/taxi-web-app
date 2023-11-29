package com.example.taxi.service;

import com.example.taxi.dto.CarDTO;
import com.example.taxi.entity.Car;
import com.example.taxi.entity.User;
import com.example.taxi.mapper.CarMapper;
import com.example.taxi.repository.CarRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CarService {
    private final CarRepository carRepository;
    private final CarMapper carMapper;

    public CarService(CarRepository carRepository, CarMapper carMapper) {
        this.carRepository = carRepository;
        this.carMapper = carMapper;
    }

    public List<CarDTO> getAllCars() {
        Long id = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return carRepository.findAllByDriverId(id).stream()
                .map(carMapper::toDTO)
                .sorted(Comparator.comparing(CarDTO::getId).reversed())
                .collect(Collectors.toList());
    }

    public CarDTO getCarById(Long id) {
        Car car = carRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Car not found"));
        return carMapper.toDTO(car);
    }

    public CarDTO createCar(CarDTO carDTO) {
        Car car = carMapper.toEntity(carDTO);
        Car createdCar = carRepository.save(car);
        return carMapper.toDTO(createdCar);
    }

    public CarDTO updateCar(CarDTO carDTO) {
        Car car = carMapper.toEntity(carDTO);
        Car updatedCar = carRepository.save(car);
        return carMapper.toDTO(updatedCar);
    }

    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }
}