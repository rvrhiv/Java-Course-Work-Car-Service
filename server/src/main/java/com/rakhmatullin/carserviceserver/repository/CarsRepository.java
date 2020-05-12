package com.rakhmatullin.carserviceserver.repository;

import com.rakhmatullin.carserviceserver.entity.Cars;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CarsRepository extends JpaRepository<Cars, Long> {
}
