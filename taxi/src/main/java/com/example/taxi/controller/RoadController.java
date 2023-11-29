package com.example.taxi.controller;

import com.example.taxi.dto.RoadDTO;
import com.example.taxi.dto.UserDTO;
import com.example.taxi.entity.User;
import com.example.taxi.service.RoadService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roads")
public class RoadController {
    private final RoadService roadService;

    public RoadController(RoadService roadService) {
        this.roadService = roadService;
    }
    @GetMapping("/pending/user")
    public List<RoadDTO> getPendingRoadsByUserId() {
        return roadService.getPendingRoadsByUserId();
    }
    @GetMapping("/finished/user")
    public List<RoadDTO> getFinishedRoadsByUserId() {
        return roadService.getFinishedRoadsByUserId();
    }
    @GetMapping("/pending/driver")
    public List<RoadDTO> getPendingRoads() {
        return roadService.getPendingRoads();
    }

    @GetMapping("/in-progress/driver")
    public List<RoadDTO> getInProgressRoadsByDriverId() {
        return roadService.getInProgressRoadsByDriverId();
    }

    @GetMapping("/finished/driver")
    public List<RoadDTO> getFinishedRoadsByDriverId() {
        return roadService.getFinishedRoadsByDriverId();
    }
    @GetMapping("/{id}")
    public ResponseEntity<RoadDTO> getRoadById(@PathVariable Long id) {
        RoadDTO road = roadService.getRoadById(id);
        return new ResponseEntity<>(road, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<RoadDTO> createRoad(@RequestBody RoadDTO roadDTO) {
        Long userId = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        UserDTO userDTO = new UserDTO();
        userDTO.setId(userId);
        roadDTO.setUser(userDTO);
        RoadDTO createdRoad = roadService.createRoad(roadDTO);
        return new ResponseEntity<>(createdRoad, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoadDTO> updateRoad(@PathVariable Long id, @RequestBody RoadDTO roadDTO) {
        Long userId = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        UserDTO userDTO = new UserDTO();
        userDTO.setId(userId);
        roadDTO.setUser(userDTO);
        roadDTO.setId(id);
        RoadDTO updatedRoad = roadService.updateRoad(roadDTO);
        return new ResponseEntity<>(updatedRoad, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRoad(@PathVariable Long id) {
        roadService.deleteRoad(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @PutMapping("/accept/{id}/{carId}")
    public ResponseEntity<RoadDTO> acceptRoad(@PathVariable Long id,@PathVariable Long carId) {
        RoadDTO updatedRoad = roadService.updateRoadAccepted(id,carId);
        return new ResponseEntity<>(updatedRoad, HttpStatus.OK);
    }
    @PutMapping("/finish/{id}")
    public ResponseEntity<RoadDTO> finishRoad(@PathVariable Long id) {
        RoadDTO updatedRoad = roadService.updateRoadFinished(id);
        return new ResponseEntity<>(updatedRoad, HttpStatus.OK);}
}
