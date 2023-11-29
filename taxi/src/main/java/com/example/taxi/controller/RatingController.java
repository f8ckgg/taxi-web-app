package com.example.taxi.controller;

import com.example.taxi.dto.RatingDTO;
import com.example.taxi.dto.UserDTO;
import com.example.taxi.entity.User;
import com.example.taxi.service.RatingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {
    private final RatingService ratingService;

    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @GetMapping
    public ResponseEntity<List<RatingDTO>> getAllRatings() {
        List<RatingDTO> ratings = ratingService.getAllRatings();
        return new ResponseEntity<>(ratings, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RatingDTO> getRatingById(@PathVariable Long id) {
        RatingDTO rating = ratingService.getRatingById(id);
        return new ResponseEntity<>(rating, HttpStatus.OK);
    }

    @PutMapping("/{driverId}")
    public ResponseEntity<RatingDTO> createRating(@RequestBody RatingDTO ratingDTO,@PathVariable Long driverId) {
        Long userId = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        UserDTO userDTO = new UserDTO();
        userDTO.setId(userId);
        ratingDTO.setUser(userDTO);
        UserDTO userDTO2 = new UserDTO();
        userDTO2.setId(driverId);
        ratingDTO.setDriver(userDTO2);
        RatingDTO createdRating = ratingService.createRating(ratingDTO);
        return new ResponseEntity<>(createdRating, HttpStatus.CREATED);
    }


    @GetMapping("/average")
    public ResponseEntity<Double> getAverageRating() {
        double averageRating = ratingService.getAverageRating();
        return new ResponseEntity<>(averageRating, HttpStatus.OK);
    }
}
