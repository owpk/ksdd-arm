package com.example.server;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LogRepo extends JpaRepository<TransformedLog, Long>,
        JpaSpecificationExecutor<TransformedLog>,
        PagingAndSortingRepository<TransformedLog, Long> {
}
