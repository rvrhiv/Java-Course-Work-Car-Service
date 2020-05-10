package com.rakhmatullin.carserviceserver.entity;


import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "services")
public class Services {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "name", nullable = false)
    @NotBlank(message = "Service Name is required.")
    private String name;

    @Column(name = "cost_our", nullable = false)
    @NotBlank(message = "The cost of the service is required.")
    @Min(value = 0, message = "Cost must be greater than zero or zero.")
    private int cost_our;

    @Column(name = "cost_foreign", nullable = false)
    @NotBlank(message = "The cost of the service is required.")
    @Min(value = 0, message = "Cost must be greater than zero or zero.")
    private int cost_foreign;

    public Services() {
    }

    public Services(String name,
                    int cost_our,
                    int cost_foreign) {
        this.name = name;
        this.cost_our = cost_our;
        this.cost_foreign = cost_foreign;
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

    public int getCost_our() {
        return cost_our;
    }

    public void setCost_our(int cost_our) {
        this.cost_our = cost_our;
    }

    public int getCost_foreign() {
        return cost_foreign;
    }

    public void setCost_foreign(int cost_foreign) {
        this.cost_foreign = cost_foreign;
    }

    @Override
    public String toString() {
        return "Services{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", cost_our=" + cost_our +
                ", cost_foreign=" + cost_foreign +
                '}';
    }
}
