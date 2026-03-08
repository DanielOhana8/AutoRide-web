package com.autoride.repository;

import com.autoride.entity.Ride;
import lombok.NonNull;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RideRepository extends JpaRepository<Ride, Long> {

    @Override
    @NonNull
    @EntityGraph(attributePaths = {"user", "car"})
    List<Ride> findAll();

    @EntityGraph(attributePaths = {"user", "car"})
    List<Ride> findByEndTimeIsNull();

    @EntityGraph(attributePaths = {"user", "car"})
    List<Ride> findByUser_Id(Long userId);

    @EntityGraph(attributePaths = {"user", "car"})
    List<Ride> findByCar_Id(Long carId);

    @EntityGraph(attributePaths = {"user", "car"})
    Optional<Ride> findByUser_IdAndEndTimeIsNull(Long userId);

    @EntityGraph(attributePaths = {"user", "car"})
    Optional<Ride> findByCar_IdAndEndTimeIsNull(Long carId);
}
