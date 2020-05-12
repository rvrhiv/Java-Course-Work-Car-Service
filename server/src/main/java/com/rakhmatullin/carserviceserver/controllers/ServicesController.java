package com.rakhmatullin.carserviceserver.controllers;

import com.rakhmatullin.carserviceserver.entity.Services;
import com.rakhmatullin.carserviceserver.exception.ServicesNotFoundException;
import com.rakhmatullin.carserviceserver.repository.ServicesRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/api/services")
public class ServicesController {

    private final ServicesRepository servicesRepository;

    @Autowired
    public ServicesController(ServicesRepository servicesRepository) {
        this.servicesRepository = servicesRepository;
    }

    @GetMapping
    public List<Services> getAll() {
        return servicesRepository.findAll();
    }

    @GetMapping("/{id}")
    public Services getServiceById(@PathVariable Long id) {
        return servicesRepository.findById(id)
                .orElseThrow(() -> new ServicesNotFoundException(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Services newService(@Valid @RequestBody Services services) {
        return servicesRepository.save(services);
    }

    @PutMapping("/{id}")
    public Services updateService(@Valid @RequestBody Services service, @PathVariable Long id) {
        return servicesRepository.findById(id)
                .map(a -> {
                    a.setCost_foreign(service.getCost_foreign());
                    a.setCost_our(service.getCost_our());
                    a.setName(service.getName());
                    return servicesRepository.save(a);
                })
                .orElseGet(() -> {
                    service.setId(id);
                    return servicesRepository.save(service);
                });
    }

    @DeleteMapping("/{id}")
    public void deleteService(@PathVariable Long id) {
        servicesRepository.deleteById(id);
    }
}
