package com.rakhmatullin.carserviceserver.repository;

import com.rakhmatullin.carserviceserver.entity.Cars;
import org.springframework.data.repository.CrudRepository;

public interface CarsRepository extends CrudRepository<Cars, Long> {
}
