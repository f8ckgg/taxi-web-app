package com.example.taxi.mapper;

import com.example.taxi.dto.UserDTO;
import com.example.taxi.entity.User;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDTO toDTO(User user);
    User toEntity(UserDTO userDTO);
}
