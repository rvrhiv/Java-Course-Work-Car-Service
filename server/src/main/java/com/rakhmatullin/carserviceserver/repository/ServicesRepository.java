package com.rakhmatullin.carserviceserver.repository;

import com.rakhmatullin.carserviceserver.entity.Services;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServicesRepository extends JpaRepository<Services, Long> {
}
