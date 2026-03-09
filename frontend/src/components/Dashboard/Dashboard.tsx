import {useEffect, useState} from "react";
import type {Ride} from "../../types";
import ActiveRide from "./ActiveRide/ActiveRide.tsx";
import {endRide, getUserActiveRide, startRide} from "../../services/rideService.ts";
import {getMyUser, updateLocation} from "../../services/userService.ts";
import {useAuth} from "../../context/AuthContext.tsx";

export default function Dashboard() {
    const [activeRide, setActiveRide] = useState<Ride | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { updateUser } = useAuth();

    const [showManualFallback, setShowManualFallback] = useState(false);
    const [manualLat, setManualLat] = useState<string>("");
    const [manualLon, setManualLon] = useState<string>("");
    const [fallbackAction, setFallbackAction] = useState<'start' | 'end' | null>(null);

    useEffect(() => {
        const fetchActiveRide = async () => {
            setIsLoading(true);

            try {
                const ride = await getUserActiveRide();
                setActiveRide(ride);
            } catch (err) {
                console.error("No active ride found or server error:", err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchActiveRide();
    }, []);

    const processRideAction = async (action: 'start' | 'end', latitude: number, longitude: number) => {
        setIsLoading(true);
        setError(null);

        try {
            if (action === 'start') {
                await updateLocation({ latitude, longitude });
                const ride = await startRide();
                setActiveRide(ride);
            } else {
                await endRide({ latitude, longitude });
                const updatedUser = await getMyUser();
                updateUser(updatedUser);
                setActiveRide(null);
            }
            setShowManualFallback(false);
            setFallbackAction(null);
        } catch (err: any) {
            setError(err.message || `Failed to ${action} ride.`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleMainAction = (action: 'start' | 'end') => {
        setError(null);
        setShowManualFallback(false);
        setFallbackAction(null);

        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser. Please use manual input.');
            setFallbackAction(action);
            setShowManualFallback(true);
            return;
        }

        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                processRideAction(action, position.coords.latitude, position.coords.longitude);
            },
            (geoError) => {
                console.error("Geolocation failed:", geoError);
                let msg = 'Could not get your location automatically. Please allow access or enter coordinates manually.';

                if (geoError.code === geoError.PERMISSION_DENIED) {
                    msg = 'Location access denied. Please enter coordinates manually to proceed.';
                }

                setError(msg);
                setFallbackAction(action);
                setShowManualFallback(true);
                setIsLoading(false);
            },
            { timeout: 10000, enableHighAccuracy: true }
        );
    };

    const handleManualSubmit = () => {
        if (!fallbackAction) {
            return;
        }

        const lat = parseFloat(manualLat);
        const lon = parseFloat(manualLon);

        if (isNaN(lat) || isNaN(lon)) {
            setError('Please enter valid numerical coordinates.');
            return;
        }

        processRideAction(fallbackAction, lat, lon);
    };

    return (
        <div>
            <h1>Dashboard</h1>
            {error && <div className="error-message">{error}</div>}
            {!activeRide ? (
                <div>
                    <h2>Ready for a ride?</h2>
                    <button onClick={() => handleMainAction('start')} disabled={isLoading}>
                        {isLoading ? 'Locating...' : 'Start Ride'}
                    </button>
                </div>
            ) : (
                <ActiveRide
                    ride={activeRide}
                    onEndRide={() => handleMainAction('end')}
                    isLoading={isLoading}
                />
            )}
            {showManualFallback && (
                <div className="manual-fallback">
                    <h3>Enter Location Manually</h3>
                    <div>
                        <input
                            type="text"
                            placeholder="Latitude"
                            value={manualLat}
                            onChange={(e) => setManualLat(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Longitude"
                            value={manualLon}
                            onChange={(e) => setManualLon(e.target.value)}
                        />
                    </div>
                    <button
                        className="manual-fallback-button"
                        onClick={handleManualSubmit}
                        disabled={isLoading || !manualLat || !manualLon}
                    >
                        {isLoading ? 'Processing...' : 'Confirm Manual Entry'}
                    </button>
                </div>
            )}
        </div>
    )
}