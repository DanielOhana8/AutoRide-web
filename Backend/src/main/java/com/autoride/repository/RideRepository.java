package com.autoride.repository;

import com.autoride.entity.Ride;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface RideRepository extends JpaRepository<Ride, Long> {

    List<Ride> findByEndTimeIsNull();

    List<Ride> findByUser_Id(Long userId);

    List<Ride> findByCar_Id(Long carId);

    Optional<Ride> findByUser_IdAndEndTimeIsNull(Long userId);

    Optional<Ride> findByCar_IdAndEndTimeIsNull(Long carId);
}
