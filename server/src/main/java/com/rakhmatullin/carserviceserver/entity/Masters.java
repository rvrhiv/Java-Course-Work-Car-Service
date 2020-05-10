package com.rakhmatullin.carserviceserver.entity;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name = "masters")
public class Masters {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "name", length = 100, nullable = false)
    @NotBlank(message = "Master name required.")
    @Size(max = 100, message = "The name of Master can't be longer than 100 characters.")
    private String name;

    public Masters() {
    }

    public Masters(String name) {
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Masters{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
