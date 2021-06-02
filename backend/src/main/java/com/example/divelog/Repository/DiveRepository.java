package com.example.divelog.Repository;

import com.example.divelog.model.Dive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiveRepository extends JpaRepository<Dive, String> {
    List<Dive> getByUserId(String id);
}
