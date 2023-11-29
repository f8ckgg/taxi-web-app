package com.example.taxi.repository;

import com.example.taxi.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CarRepository extends JpaRepository<Car, Long> {
    List<Car> findAllByDriverId(Long driverId);
}
