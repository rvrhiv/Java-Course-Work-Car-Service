package com.rakhmatullin.carserviceserver;

import com.rakhmatullin.carserviceserver.entity.Cars;
import com.rakhmatullin.carserviceserver.entity.Masters;
import com.rakhmatullin.carserviceserver.entity.Services;
import com.rakhmatullin.carserviceserver.entity.Works;
import com.rakhmatullin.carserviceserver.repository.CarsRepository;
import com.rakhmatullin.carserviceserver.repository.MastersRepository;
import com.rakhmatullin.carserviceserver.repository.ServicesRepository;
import com.rakhmatullin.carserviceserver.repository.WorksRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.sql.Date;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final CarsRepository carsRepository;
    private final MastersRepository mastersRepository;
    private final ServicesRepository servicesRepository;
    private final WorksRepository worksRepository;

    @Autowired
    public DatabaseLoader(CarsRepository carsRepository,
                          MastersRepository mastersRepository,
                          ServicesRepository servicesRepository,
                          WorksRepository worksRepository) {
        this.carsRepository = carsRepository;
        this.mastersRepository = mastersRepository;
        this.servicesRepository = servicesRepository;
        this.worksRepository = worksRepository;
    }

    @Override
    public void run(String... args) {
        worksRepository.deleteAll();
        carsRepository.deleteAll();
        mastersRepository.deleteAll();
        servicesRepository.deleteAll();

        Cars bmwI8 = new Cars("A000AA00", "black", "BMW", true);
        Cars ladaVesta = new Cars("A001AA00", "blue", "LADA", false);
        carsRepository.save(bmwI8);
        carsRepository.save(ladaVesta);

        Masters alex = new Masters("Alex Rakhmatullin");
        Masters ilya = new Masters("Ilya Gusarov");
        Masters vlad = new Masters("Vladislav Zibkin");
        mastersRepository.save(alex);
        mastersRepository.save(ilya);
        mastersRepository.save(vlad);

        Services updateOil = new Services("update oil", 1000, 2000);
        Services washing = new Services("washing", 350, 550);
        Services engineRepair = new Services("engine repair", 8000, 10000);
        Services wheelRepair = new Services("wheel repair", 3000, 5000);
        servicesRepository.save(updateOil);
        servicesRepository.save(washing);
        servicesRepository.save(engineRepair);
        servicesRepository.save(wheelRepair);

        Works work1 = new Works(Date.valueOf("2020-05-11"), alex, bmwI8, updateOil);
        Works work2 = new Works(Date.valueOf("2020-05-11"), alex, bmwI8, washing);
        Works work3 = new Works(Date.valueOf("2020-05-12"), ilya, ladaVesta, wheelRepair);
        Works work4 = new Works(Date.valueOf("2020-05-13"), vlad, ladaVesta, engineRepair);

        worksRepository.save(work1);
        worksRepository.save(work2);
        worksRepository.save(work3);
        worksRepository.save(work4);
    }
}
