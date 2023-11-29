package com.example.taxi.repository;

import com.example.taxi.entity.Road;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoadRepository extends JpaRepository<Road, Long> {
    List<Road> findAllByAcceptedIsFalse();
    List<Road> findAllByDriverIdAndAcceptedIsTrueAndFinishedIsFalse(Long driverId);
    List<Road> findAllByDriverIdAndFinishedIsTrue(Long driverId);
    List<Road> findAllByUserIdAndFinishedIsFalse(Long userId);
    List<Road> findAllByUserIdAndFinishedIsTrue(Long userId);
}
