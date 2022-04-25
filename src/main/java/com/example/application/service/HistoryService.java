package com.example.application.service;

import com.example.application.data.GroceryItem;
import com.example.application.mapper.GroceryMapper;
import com.example.application.repository.HistoryRepository;
import org.javers.shadow.Shadow;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HistoryService {

    private final HistoryRepository historyRepository;
    private final GroceryMapper groceryMapper;

    public HistoryService(HistoryRepository historyRepository, GroceryMapper groceryMapper) {
        this.historyRepository = historyRepository;
        this.groceryMapper = groceryMapper;
    }

    public List<GroceryItem> getAllChangedGrocery() {
        return historyRepository.getAllGroceryShadows().stream()
                .map(Shadow::get)
                .map(groceryMapper::toDto)
                .collect(Collectors.toList());
    }
}
