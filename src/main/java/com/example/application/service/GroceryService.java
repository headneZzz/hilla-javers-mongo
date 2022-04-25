package com.example.application.service;

import com.example.application.data.GroceryItem;
import com.example.application.entity.Grocery;
import com.example.application.mapper.GroceryMapper;
import com.example.application.repository.GroceryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GroceryService {

    private final GroceryRepository groceryRepository;
    private final GroceryMapper groceryMapper;

    public GroceryService(GroceryRepository groceryRepository, GroceryMapper groceryMapper) {
        this.groceryRepository = groceryRepository;
        this.groceryMapper = groceryMapper;
    }

    public List<GroceryItem> getAll() {
        return groceryRepository.findAll().stream()
                .map(groceryMapper::toDto)
                .collect(Collectors.toList());
    }

    public GroceryItem getGrocery(String id) {
        return groceryMapper.toDto(groceryRepository.findById(id).orElse(new Grocery()));
    }

    public GroceryItem save(GroceryItem item) {
        return groceryMapper.toDto(groceryRepository.save(groceryMapper.toEntity(item)));
    }
}
