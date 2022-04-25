package com.example.application.repository;

import com.example.application.entity.Grocery;
import org.javers.core.Javers;
import org.javers.core.metamodel.object.CdoSnapshot;
import org.javers.repository.jql.JqlQuery;
import org.javers.repository.jql.QueryBuilder;
import org.javers.shadow.Shadow;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class HistoryRepository {

    private final Javers javers;

    public HistoryRepository(Javers javers) {
        this.javers = javers;
    }

    public List<CdoSnapshot> getAllSnapshots() {
        JqlQuery jqlQuery = QueryBuilder.byClass(Grocery.class).build();
        return javers.findSnapshots(jqlQuery);
    }

    public List<Shadow<Grocery>> getAllGroceryShadows() {
        JqlQuery jqlQuery = QueryBuilder.byClass(Grocery.class).withScopeCommitDeep().build();
        return javers.findShadows(jqlQuery);
    }

    public List<CdoSnapshot> getById(String id) {
        JqlQuery jqlQuery = QueryBuilder.byInstanceId(id, Grocery.class).build();
        return javers.findSnapshots(jqlQuery);
    }
}
