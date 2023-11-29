package com.example.taxi.repository;


import com.example.taxi.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingRepository extends JpaRepository<Rating, Long> {
    List<Rating> findAllByDriverId(Long driverId);
}
