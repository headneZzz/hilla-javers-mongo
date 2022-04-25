package com.example.application.endpoint;

import com.example.application.data.GroceryItem;
import com.example.application.service.GroceryService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;

@Endpoint
@AnonymousAllowed
public class GroceryItemEndpoint {

    private final GroceryService groceryService;

    public GroceryItemEndpoint(GroceryService groceryService) {
        this.groceryService = groceryService;
    }

    public @Nonnull GroceryItem getGrocery(String id) {
        return groceryService.getGrocery(id);
    }

    public GroceryItem save(GroceryItem item) {
        return groceryService.save(item);
    }
}
