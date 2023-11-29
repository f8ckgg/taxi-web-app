package com.example.taxi.service;

import com.example.taxi.dto.RoadDTO;
import com.example.taxi.dto.UserDTO;
import com.example.taxi.entity.Car;
import com.example.taxi.entity.Road;
import com.example.taxi.entity.User;
import com.example.taxi.mapper.RoadMapper;
import com.example.taxi.repository.RoadRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoadService {
    private final RoadRepository roadRepository;
    private final RoadMapper roadMapper;

    public RoadService(RoadRepository roadRepository, RoadMapper roadMapper) {
        this.roadRepository = roadRepository;
        this.roadMapper = roadMapper;
    }

    public List<RoadDTO> getPendingRoads() {
        return roadRepository.findAllByAcceptedIsFalse().stream()
                .map(roadMapper::toDTO)
                .sorted(Comparator.comparing(RoadDTO::getId).reversed())
                .collect(Collectors.toList());
    }

    public List<RoadDTO> getInProgressRoadsByDriverId() {
        Long id = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return roadRepository.findAllByDriverIdAndAcceptedIsTrueAndFinishedIsFalse(id).stream()
                .map(roadMapper::toDTO)
                .sorted(Comparator.comparing(RoadDTO::getId).reversed())
                .collect(Collectors.toList());
    }

    public List<RoadDTO> getFinishedRoadsByDriverId() {
        Long id = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return roadRepository.findAllByDriverIdAndFinishedIsTrue(id).stream()
                .map(roadMapper::toDTO)
                .sorted(Comparator.comparing(RoadDTO::getId).reversed())
                .collect(Collectors.toList());
    }

    public List<RoadDTO> getPendingRoadsByUserId() {
        Long id = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return roadRepository.findAllByUserIdAndFinishedIsFalse(id).stream()
                .map(roadMapper::toDTO)
                .sorted(Comparator.comparing(RoadDTO::getId).reversed())
                .collect(Collectors.toList());
    }

    public List<RoadDTO> getFinishedRoadsByUserId() {
        Long id = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return roadRepository.findAllByUserIdAndFinishedIsTrue(id).stream()
                .map(roadMapper::toDTO)
                .sorted(Comparator.comparing(RoadDTO::getId).reversed())
                .collect(Collectors.toList());
    }

    public RoadDTO getRoadById(Long id) {
        Road road = roadRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Road not found"));
        return roadMapper.toDTO(road);
    }

    public RoadDTO createRoad(RoadDTO roadDTO) {
        Road road = roadMapper.toEntity(roadDTO);
        Road createdRoad = roadRepository.save(road);
        return roadMapper.toDTO(createdRoad);
    }

    public RoadDTO updateRoad(RoadDTO roadDTO) {
        Road road = roadMapper.toEntity(roadDTO);
        Road updatedRoad = roadRepository.save(road);
        return roadMapper.toDTO(updatedRoad);
    }

    public void deleteRoad(Long id) {
        roadRepository.deleteById(id);
    }

    public RoadDTO updateRoadAccepted(Long id,Long carId) {
        Road road = roadRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Road not found"));
        Long userId = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        User user = new User();
        user.setId(userId);
        road.setDriver(user);
        Car car = new Car();
        car.setId(carId);
        road.setCar(car);
        road.setAccepted(true);
        Road updatedRoad = roadRepository.save(road);
        return roadMapper.toDTO(updatedRoad);
    }
    public RoadDTO updateRoadFinished(Long id) {
        Road road = roadRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Road not found"));
        Long userId = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        User user = new User();
        user.setId(userId);
        road.setDriver(user);
        road.setFinished(true);
        Road updatedRoad = roadRepository.save(road);
        return roadMapper.toDTO(updatedRoad);
    }
}
