package com.example.taxi.service;

import com.example.taxi.dto.RatingDTO;
import com.example.taxi.entity.Rating;
import com.example.taxi.entity.User;
import com.example.taxi.mapper.RatingMapper;
import com.example.taxi.repository.RatingRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RatingService {
    private final RatingRepository ratingRepository;
    private final RatingMapper ratingMapper;

    public RatingService(RatingRepository ratingRepository, RatingMapper ratingMapper) {
        this.ratingRepository = ratingRepository;
        this.ratingMapper = ratingMapper;
    }

    public List<RatingDTO> getAllRatings() {
        Long id = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return ratingRepository.findAllByDriverId(id).stream()
                .map(ratingMapper::toDTO)
                .sorted(Comparator.comparing(RatingDTO::getId).reversed())
                .collect(Collectors.toList());
    }

    public RatingDTO getRatingById(Long id) {
        Rating rating = ratingRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Rating not found"));
        return ratingMapper.toDTO(rating);
    }

    public RatingDTO createRating(RatingDTO ratingDTO) {
        Rating rating = ratingMapper.toEntity(ratingDTO);
        Rating createdRating = ratingRepository.save(rating);
        return ratingMapper.toDTO(createdRating);
    }

    public RatingDTO updateRating(RatingDTO ratingDTO) {
        Rating rating = ratingMapper.toEntity(ratingDTO);
        Rating updatedRating = ratingRepository.save(rating);
        return ratingMapper.toDTO(updatedRating);
    }

    public void deleteRating(Long id) {
        ratingRepository.deleteById(id);
    }

    public double getAverageRating() {
        Long id = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        List<Rating> ratings = ratingRepository.findAllByDriverId(id);
        double sum = 0.0;
        for (Rating rating : ratings) {
            sum += rating.getValue();
        }
        return sum / ratings.size();
    }
}