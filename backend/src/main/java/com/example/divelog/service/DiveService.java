package com.example.divelog.service;

import com.example.divelog.Repository.DiveRepository;
import com.example.divelog.Repository.UserRepository;
import com.example.divelog.dto.TimeLineDTO;
import com.example.divelog.dto.UserDTO;
import com.example.divelog.model.Dive;
import com.example.divelog.model.DiveType;
import com.example.divelog.model.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Hashtable;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor

public class DiveService {
    private final DiveRepository diveRepository;
    private final UserRepository userRepository;
    private final UserService userService;

    public List<Dive> getAllDiveForGivenUser(String id) {
        return diveRepository.getByUserId(id).stream().map(e -> e.toBuilder()
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

    public List<TimeLineDTO> getAllDiveForTimeLine(String id) {
        HashSet<String> followedUserIdList = userRepository.findById(id).orElseThrow(NullPointerException::new).getFollowedUsers();
        List<Dive> allDiveForTimeLine = followedUserIdList.stream()
                .map(diveRepository::getByUserId)
                .flatMap(List::stream)
                .collect(Collectors.toList());

        log.info(String.valueOf(allDiveForTimeLine));
        return allDiveForTimeLine.stream().map(dive -> TimeLineDTO.builder()
                .id(dive.getId())
                .depth(dive.getDepth())
                .duration(dive.getDuration())
                .latitude(dive.getLatitude())
                .longitude(dive.getLongitude())
                .user(UserDTO.builder()
                        .fullName(dive.getUser().getFullName())
                        .id(dive.getUser().getId())
                        .build())
                .build()).collect(Collectors.toList());
    }
}