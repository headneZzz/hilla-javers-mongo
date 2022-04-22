package com.example.application.endpoint;

import com.example.application.data.GroceryItem;
import com.example.application.service.GroceryService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;

import java.util.List;

@Endpoint
@AnonymousAllowed
public class GroceryEndpoint {

    private final GroceryService groceryService;

    public GroceryEndpoint(GroceryService groceryService) {
        this.groceryService = groceryService;
    }

    public @Nonnull List<@Nonnull GroceryItem> getGroceries() {
        return groceryService.getAll();
    }

    public GroceryItem save(GroceryItem item) {
        return groceryService.save(item);
    }
}
