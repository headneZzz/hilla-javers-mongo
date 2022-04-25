package com.example.application.mapper;

import com.example.application.data.GroceryItem;
import com.example.application.entity.Grocery;
import org.springframework.stereotype.Component;

@Component
public class GroceryMapper {

    public Grocery toEntity(GroceryItem dto) {
        Grocery grocery = new Grocery();
        grocery.setId(dto.getId());
        grocery.setName(dto.getName());
        grocery.setQuantity(dto.getQuantity());
        return grocery;
    }

    public GroceryItem toDto (Grocery entity) {
        GroceryItem groceryItem = new GroceryItem();
        groceryItem.setId(entity.getId());
        groceryItem.setName(entity.getName());
        groceryItem.setQuantity(entity.getQuantity());
        return groceryItem;
    }
}
