package com.example.divelog.Controller;

import com.example.divelog.model.Dive;
import com.example.divelog.service.DiveService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Hashtable;
import java.util.List;

@RestController
@RequestMapping("/api/dive")
@RequiredArgsConstructor
@CrossOrigin
public class DiveController {

    private final DiveService diveService;

    @GetMapping("/{id}")
    public List<Dive> getAllDiveForGivenUser(@PathVariable String id){
        return diveService.getAllDiveForGivenUser(id);
    }

    @PostMapping("/{id}")
    public Dive save(@RequestBody Dive dive, @PathVariable String id){
        return diveService.save(dive, id);
    }

    @GetMapping("/{id}/dive")
    public Dive findOne(@PathVariable String id){
        return diveService.findOne(id);
    }

    @GetMapping("/{id}/stats")
    public Hashtable<String, String> getStats(@PathVariable String id){
        return diveService.getStats(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable String id){
        diveService.delete(id);
    }
}
