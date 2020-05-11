package com.rakhmatullin.carserviceserver.repository;

import com.rakhmatullin.carserviceserver.entity.Services;
import org.springframework.data.repository.CrudRepository;

public interface ServicesRepository extends CrudRepository<Services, Long> {
}
