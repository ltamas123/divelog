package com.example.divelog.service;

import com.example.divelog.Repository.DiveRepository;
import com.example.divelog.model.Dive;
import com.example.divelog.model.DiveType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Hashtable;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor

public class DiveService {
    private final DiveRepository diveRepository;
    private final UserService userService;

    public List<Dive> getAllDiveForGivenUser(String id) {
        return diveRepository.getByUserId(id).stream().map(e-> e.toBuilder()
                .user(null)
                .build()).collect(Collectors.toList());
    }

    public Dive save(Dive dive, String id) {
        return diveRepository.save(dive.toBuilder()
                .user(userService.findOne(id).orElseThrow())
                .type(DiveType.SCUBA)
                .build());
    }

    public void delete(String id) {
        diveRepository.delete(diveRepository.getById(id));
    }

    public Dive findOne(String id) {
        return diveRepository.getById(id);
    }

    public Hashtable<String, String> getStats(String id) {
        List<Dive> allDivsForUser = diveRepository.getByUserId(id);
        Hashtable<String, String> stats = new Hashtable<>();
        stats.put("count", String.valueOf((long) allDivsForUser.size()));
        stats.put("maxDepth", String.valueOf(allDivsForUser.stream().map(Dive::getDepth).max(Double::compareTo).orElse((double) 0)));
        stats.put("maxTime", String.valueOf(allDivsForUser.stream().map(Dive::getDuration).max(Double::compareTo).orElse((double) 0)));

        return stats;
    }
}