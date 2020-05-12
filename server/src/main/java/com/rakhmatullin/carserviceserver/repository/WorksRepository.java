package com.rakhmatullin.carserviceserver.repository;

import com.rakhmatullin.carserviceserver.entity.Works;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorksRepository extends JpaRepository<Works, Long> {
}
