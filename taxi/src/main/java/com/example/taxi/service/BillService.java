package com.example.taxi.service;

import com.example.taxi.dto.BillDTO;
import com.example.taxi.entity.Bill;
import com.example.taxi.entity.User;
import com.example.taxi.mapper.BillMapper;
import com.example.taxi.repository.BillRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BillService {
    private final BillRepository billRepository;
    private final BillMapper billMapper;

    public BillService(BillRepository billRepository, BillMapper billMapper) {
        this.billRepository = billRepository;
        this.billMapper = billMapper;
    }

    public List<BillDTO> getAllBills() {
        Long id = ((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return billRepository.findAllByRoadUserId(id).stream()
                .map(billMapper::toDTO)
                .sorted(Comparator.comparing(BillDTO::getId).reversed())
                .collect(Collectors.toList());
    }

    public BillDTO getBillById(Long id) {
        Bill bill = billRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Bill not found"));
        return billMapper.toDTO(bill);
    }

    public BillDTO createBill(BillDTO billDTO) {
        Bill bill = billMapper.toEntity(billDTO);
        Bill createdBill = billRepository.save(bill);
        return billMapper.toDTO(createdBill);
    }

    public BillDTO updateBill(BillDTO billDTO) {
        Bill bill = billMapper.toEntity(billDTO);
        Bill updatedBill = billRepository.save(bill);
        return billMapper.toDTO(updatedBill);
    }

    public void deleteBill(Long id) {
        billRepository.deleteById(id);
    }
}

