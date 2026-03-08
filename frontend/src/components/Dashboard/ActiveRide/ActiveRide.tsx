import { useState, useEffect } from "react";
import type { Ride, Car } from "../../../types";
import { getCarById } from "../../../services/carService.ts";

interface ActiveRideProps {
    ride: Ride;
    onEndRide: () => void;
    isLoading: boolean;
}

export default function ActiveRide({ ride, onEndRide, isLoading }: ActiveRideProps) {
    const [car, setCar] = useState<Car | null>(null);
    const [carError, setCarError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                setCarError(null);
                const carData = await getCarById(ride.carId);
                setCar(carData);
            } catch (err) {
                setCarError('Failed to load car details');
            }
        };

        if (ride.carId) {
            fetchCarDetails();
        }
    }, [ride.carId]);

    return (
        <div>
            <h2>Active Ride</h2>
            <div>
                <p><strong>Ride ID: </strong>{ride.id}</p>
                <p><strong>Car Model: </strong>
                    {carError ? <span className="text-error">{carError}</span> : car ? car.model : 'Loading...'}
                </p>
                <p><strong>Start Time: </strong>{new Date(ride.startTime).toLocaleString()}</p>
            </div>
            <button onClick={onEndRide} disabled={isLoading}>
                {isLoading ? 'Ending Ride...' : 'End Ride'}
            </button>
        </div>
    );
}