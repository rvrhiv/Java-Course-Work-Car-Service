package com.rakhmatullin.carserviceserver;

import com.rakhmatullin.carserviceserver.entity.*;
import com.rakhmatullin.carserviceserver.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.sql.Date;
import java.util.List;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final CarsRepository carsRepository;
    private final MastersRepository mastersRepository;
    private final ServicesRepository servicesRepository;
    private final WorksRepository worksRepository;

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public DatabaseLoader(CarsRepository carsRepository,
                          MastersRepository mastersRepository,
                          ServicesRepository servicesRepository,
                          WorksRepository worksRepository,
                          UserRepository userRepository,
                          PasswordEncoder passwordEncoder) {
        this.carsRepository = carsRepository;
        this.mastersRepository = mastersRepository;
        this.servicesRepository = servicesRepository;
        this.worksRepository = worksRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        worksRepository.deleteAll();
        carsRepository.deleteAll();
        mastersRepository.deleteAll();
        servicesRepository.deleteAll();

        Cars bmwI8 = new Cars("A000AA00", "#000000", "BMW", true);
        Cars ladaVesta = new Cars("A001AA00", "#FFFFFF", "LADA", false);
        Cars nissan = new Cars("K777AK111", "#B3E731", "NISSAN", true);
        carsRepository.save(bmwI8);
        carsRepository.save(ladaVesta);
        carsRepository.save(nissan);

        Masters alex = new Masters("Alex Rakhmatullin");
        Masters ilya = new Masters("Ilya Gusarov");
        Masters vlad = new Masters("Vladislav Zibkin");
        Masters serega = new Masters("Sergey Kozhin");
        mastersRepository.save(alex);
        mastersRepository.save(ilya);
        mastersRepository.save(vlad);
        mastersRepository.save(serega);

        Services changeOil = new Services("Change oil", 1000, 2000);
        Services washing = new Services("Washing", 350, 550);
        Services engineRepair = new Services("Engine repair", 8000, 10000);
        Services wheelRepair = new Services("Wheel repair", 3000, 5000);
        Services repainting = new Services("Repainting", 3000, 10000);
        Services checkUp = new Services("Check Up", 6000, 9000);
        servicesRepository.save(changeOil);
        servicesRepository.save(washing);
        servicesRepository.save(engineRepair);
        servicesRepository.save(wheelRepair);
        servicesRepository.save(repainting);
        servicesRepository.save(checkUp);

        Works work1 = new Works(Date.valueOf("2020-05-11"), alex, bmwI8, changeOil);
        Works work2 = new Works(Date.valueOf("2020-05-11"), alex, bmwI8, washing);
        Works work3 = new Works(Date.valueOf("2020-05-12"), ilya, ladaVesta, wheelRepair);
        Works work4 = new Works(Date.valueOf("2020-05-13"), vlad, ladaVesta, engineRepair);

        worksRepository.save(work1);
        worksRepository.save(work2);
        worksRepository.save(work3);
        worksRepository.save(work4);

        userRepository.save(new User("user@user", passwordEncoder.encode("password"), List.of("ROLE_USER")));
        userRepository.save(new User("admin@admin", passwordEncoder.encode("admin"), List.of("ROLE_ADMIN")));
    }
}
