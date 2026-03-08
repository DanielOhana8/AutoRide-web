import {useEffect, useState} from "react";
import type {Ride} from "../../types";
import ActiveRide from "./ActiveRide/ActiveRide.tsx";
import {endRide, getUserActiveRide, startRide} from "../../services/rideService.ts";
import {updateLocation} from "../../services/userService.ts";

export default function Dashboard() {
    const [activeRide, setActiveRide] = useState<Ride | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchActiveRide = async () => {
            try {
                const ride = await getUserActiveRide();
                setActiveRide(ride);
            } catch (err) {}
        };
        fetchActiveRide();
    }, []);

    const handleStartRide = () => {
        setIsLoading(true);
        setError(null);

        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser.');
            setIsLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const x = Math.round(position.coords.latitude * 111);
                    const y = Math.round(position.coords.longitude * 111);

                    await updateLocation({ x, y });
                    const ride = await startRide();
                    setActiveRide(ride);
                } catch (err: any) {
                    setError(err.message || 'Failed to start ride. Make sure your balance is positive.');
                } finally {
                    setIsLoading(false);
                }
            },
            () => {
                setError('Failed to get your location. Please allow location access.');
                setIsLoading(false);
            }
        );
    }

    const handleEndRide = () => {
        setIsLoading(true);
        setError(null);

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const x = Math.round(position.coords.latitude * 111);
                    const y = Math.round(position.coords.longitude * 111);

                    await endRide({ x, y });
                    setActiveRide(null);
                } catch (err: any) {
                    setError(err.message || 'Failed to end the ride.');
                } finally {
                    setIsLoading(false);
                }
            },
            () => {
                setError('Failed to get location to end ride.');
                setIsLoading(false);
            }
        );
    }

    return (
        <div>
            <h1>Dashboard</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {!activeRide ? (
                <div>
                    <h2>Ready for a ride?</h2>
                    <button onClick={handleStartRide} disabled={isLoading}>
                        {isLoading ? 'Starting...' : 'Start Ride'}
                    </button>
                </div>
            ) : (
                <ActiveRide
                    ride={activeRide}
                    onEndRide={handleEndRide}
                    isLoading={isLoading}
                />
            )}
        </div>
    )
}