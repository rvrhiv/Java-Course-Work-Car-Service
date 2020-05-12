package com.rakhmatullin.carserviceserver.entity;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Entity
@Table(name = "cars")
public class Cars {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank(message = "Car number is required.")
    private String num;

    @NotBlank(message = "Car color is required.")
    private String color;

    @NotBlank(message = "Car model(mark) is required.")
    private String mark;

    private boolean is_foreign;

    public Cars() {
    }

    public Cars(String num,
                String color,
                String mark,
                boolean is_foreign) {
        this.num = num;
        this.color = color;
        this.mark = mark;
        this.is_foreign = is_foreign;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getNum() {
        return num;
    }

    public void setNum(String num) {
        this.num = num;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getMark() {
        return mark;
    }

    public void setMark(String mark) {
        this.mark = mark;
    }

    public boolean is_foreign() {
        return is_foreign;
    }

    public void setIs_foreign(boolean is_foreign) {
        this.is_foreign = is_foreign;
    }

    @Override
    public String toString() {
        return "Cars{" +
                "id=" + id +
                ", num='" + num + '\'' +
                ", color='" + color + '\'' +
                ", mark='" + mark + '\'' +
                ", is_foreign=" + is_foreign +
                '}';
    }
}
