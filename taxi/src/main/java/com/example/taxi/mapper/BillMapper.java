package com.example.taxi.mapper;

import com.example.taxi.dto.BillDTO;
import com.example.taxi.entity.Bill;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BillMapper {
    BillDTO toDTO(Bill bill);
    Bill toEntity(BillDTO billDTO);
}
