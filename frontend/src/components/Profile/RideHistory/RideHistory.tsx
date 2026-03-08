import { useState, useEffect } from 'react';
import type { Ride } from '../../../types';
import { getUserRidesHistory } from '../../../services/rideService.ts';

export default function RideHistory() {
    const [rides, setRides] = useState<Ride[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRides = async () => {
            try {
                const data = await getUserRidesHistory();
                const sortedRides = data.sort((a: Ride, b: Ride) =>
                    new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
                );
                setRides(sortedRides);
            } catch (err) {
                setError('Failed to load ride history.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchRides();
    }, []);

    if (isLoading) {
        return <p>Loading ride history...</p>;
    }

    if (error) {
        return <p className="text-error">{error}</p>;
    }

    if (rides.length === 0) {
        return <p>You have no ride history yet.</p>;
    }

    return (
        <div>
            <h2>Ride History</h2>
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Start Location</th>
                    <th>End Location</th>
                    <th>Cost</th>
                </tr>
                </thead>
                <tbody>
                {rides.map((ride) => (
                    <tr key={ride.id}>
                        <td>
                            {new Date(ride.startTime).toLocaleString()}
                        </td>
                        <td>
                            {(ride.startLatitude / 111).toFixed(4)}, {(ride.startLongitude / 111).toFixed(4)}
                        </td>
                        <td>
                            {ride.endLatitude && ride.endLongitude
                                ? `${(ride.endLatitude / 111).toFixed(4)}, ${(ride.endLongitude / 111).toFixed(4)}`
                                : 'Ongoing'}
                        </td>
                        <td>
                            {ride.price !== null ? `$${ride.price.toFixed(2)}` : 'N/A'}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}