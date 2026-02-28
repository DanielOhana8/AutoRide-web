package com.autoride.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "cars")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String model;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "x", column = @Column(nullable = false)),
            @AttributeOverride(name = "y", column = @Column(nullable = false))
    })
    private Location location;

    @Column(nullable = false)
    @Builder.Default
    private Boolean available = true;
}
