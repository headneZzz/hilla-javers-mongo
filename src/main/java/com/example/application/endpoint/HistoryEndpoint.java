package com.example.application.endpoint;

import com.example.application.data.GroceryItem;
import com.example.application.service.HistoryService;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;

import javax.annotation.security.RolesAllowed;
import java.util.List;

@Endpoint
public class HistoryEndpoint {

    private final HistoryService historyService;

    public HistoryEndpoint(HistoryService historyService) {
        this.historyService = historyService;
    }

    @RolesAllowed("ROLE_ADMIN")
    public @Nonnull List<@Nonnull GroceryItem> getAllChangedGrocery() {
        return historyService.getAllChangedGrocery();
    }

    @RolesAllowed("ROLE_ADMIN")
    public @Nonnull List<@Nonnull String> getById(String id) {
        return historyService.getById(id);
    }
}
