package com.example.taxi.repository;

import com.example.taxi.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BillRepository extends JpaRepository<Bill, Long> {
    List<Bill> findAllByRoadUserId(Long userId);
}
