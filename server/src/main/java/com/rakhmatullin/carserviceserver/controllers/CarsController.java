package com.rakhmatullin.carserviceserver.controllers;


import com.rakhmatullin.carserviceserver.entity.Cars;
import com.rakhmatullin.carserviceserver.exception.CarsNotFoundException;
import com.rakhmatullin.carserviceserver.repository.CarsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/api/cars")
public class CarsController {

    private final CarsRepository carsRepository;

    @Autowired
    public CarsController(CarsRepository carsRepository) {
        this.carsRepository = carsRepository;
    }

    @GetMapping
    public List<Cars> getAll() {
        return carsRepository.findAll();
    }

    @GetMapping("/{id}")
    public Cars getCarById(@PathVariable Long id) {
        return carsRepository.findById(id)
                .orElseThrow(() -> new CarsNotFoundException(id));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Cars newCar(@Valid @RequestBody Cars newCar) {
        return carsRepository.save(newCar);
    }

    @PutMapping("/{id}")
    public Cars updateCar(@Valid @RequestBody Cars car, @PathVariable Long id) {
        return carsRepository.findById(id)
                .map(a -> {
                    a.setColor(car.getColor());
                    a.setIs_foreign(car.is_foreign());
                    a.setMark(car.getMark());
                    a.setNum(car.getNum());
                    return carsRepository.save(a);
                })
                .orElseGet(() -> {
                    car.setId(id);
                    return carsRepository.save(car);
                });
    }

    @DeleteMapping("/{id}")
    public void deleteCar(@PathVariable Long id) {
        carsRepository.deleteById(id);
    }
}
