package com.rakhmatullin.carserviceserver.controllers;

import com.rakhmatullin.carserviceserver.entity.Masters;
import com.rakhmatullin.carserviceserver.exception.MastersNotFoundException;
import com.rakhmatullin.carserviceserver.repository.MastersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/api/masters")
public class MastersController {
    private final MastersRepository mastersRepository;

    @Autowired
    public MastersController(MastersRepository mastersRepository) {
        this.mastersRepository = mastersRepository;
    }

    @GetMapping
    public List<Masters> getAll() {
        return mastersRepository.findAll();
    }

    @GetMapping("/{id}")
    public Masters getMasterById(@PathVariable Long id) {
        return mastersRepository.findById(id)
                .orElseThrow(() -> new MastersNotFoundException(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Masters newMaster(@Valid @RequestBody Masters newMaster) {
        return mastersRepository.save(newMaster);
    }

    @PutMapping("/{id}")
    public Masters updateMaster(@Valid @RequestBody Masters master, @PathVariable Long id) {
        return mastersRepository.findById(id)
                .map(a -> {
                    a.setName(master.getName());
                    return mastersRepository.save(a);
                })
                .orElseGet(() -> {
                    master.setId(id);
                    return mastersRepository.save(master);
                });
    }

    @DeleteMapping("/{id}")
    public void deleteMaster(@PathVariable Long id) {
        mastersRepository.deleteById(id);
    }
}
