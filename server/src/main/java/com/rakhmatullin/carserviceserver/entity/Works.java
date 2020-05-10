package com.rakhmatullin.carserviceserver.entity;


import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.sql.Date;

@Entity
@Table(name = "works")
public class Works {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "date_work", nullable = false)
    @NotBlank(message = "Work Date is required.")
    private Date date_work;

    @ManyToOne(targetEntity = Masters.class)
    @NotNull(message = "Master is required.")
    private Masters master;

    @ManyToOne(targetEntity = Cars.class)
    @NotNull(message = "Car is required.")
    private Cars car;

    @ManyToOne(targetEntity = Services.class)
    @NotNull(message = "Service is required.")
    private Services service;

    public Works() {
    }

    public Works(Date date_work,
                 Masters master,
                 Cars car,
                 Services service) {
        this.date_work = date_work;
        this.master = master;
        this.car = car;
        this.service = service;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getDate_work() {
        return date_work;
    }

    public void setDate_work(Date date_work) {
        this.date_work = date_work;
    }

    public Masters getMaster() {
        return master;
    }

    public void setMaster(Masters master) {
        this.master = master;
    }

    public Cars getCar() {
        return car;
    }

    public void setCar(Cars car) {
        this.car = car;
    }

    public Services getService() {
        return service;
    }

    public void setService(Services service) {
        this.service = service;
    }

    @Override
    public String toString() {
        return "Works{" +
                "id=" + id +
                ", date_work=" + date_work +
                ", master=" + master +
                ", car=" + car +
                ", service=" + service +
                '}';
    }
}
