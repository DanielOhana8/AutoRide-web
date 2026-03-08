package com.autoride.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "cars")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Car {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String model;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "latitude", column = @Column(nullable = false)),
            @AttributeOverride(name = "longitude", column = @Column(nullable = false))
    })
    private Location location;

    @Column(nullable = false)
    @Builder.Default
    private Boolean isAvailable = true;

    @Column(precision = 10, scale = 2, nullable = false)
    @Builder.Default
    private BigDecimal pricePerMin = BigDecimal.ONE;
}
