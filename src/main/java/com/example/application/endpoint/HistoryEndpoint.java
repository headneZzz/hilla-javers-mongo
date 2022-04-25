package com.example.application.endpoint;

import com.example.application.data.GroceryItem;
import com.example.application.service.HistoryService;
import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import dev.hilla.Nonnull;

import java.util.List;

@Endpoint
@AnonymousAllowed
public class HistoryEndpoint {

    private final HistoryService historyService;

    public HistoryEndpoint(HistoryService historyService) {
        this.historyService = historyService;
    }

    public @Nonnull List<@Nonnull GroceryItem> getAllChangedGrocery() {
        return historyService.getAllChangedGrocery();
    }
}
