import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.tsx';
import Balance from './Balance/Balance.tsx';
import RideHistory from "./RideHistory/RideHistory.tsx";

export default function Profile() {
    const { user } = useAuth();
    const [activeView, setActiveView] = useState<'profile' | 'balance' | 'history'>('profile');

    if (!user) {
        return null;
    }

    return (
        <div>
            <h1>My Profile</h1>

            <div className="button-group">
                <button
                    onClick={() => setActiveView('profile')}
                    disabled={activeView === 'profile'}
                >
                    Profile Details
                </button>
                <button
                    onClick={() => setActiveView('balance')}
                    disabled={activeView === 'balance'}
                >
                    Add Balance
                </button>
                <button
                    onClick={() => setActiveView('history')}
                    disabled={activeView === 'history'}
                >
                    Ride History
                </button>
            </div>
            <div className="card">
                {activeView === 'profile' && (
                    <div>
                        <h2>Personal Information</h2>
                        <p><strong>Name: </strong>{user.name}</p>
                        <p><strong>Email: </strong>{user.email}</p>
                        <p><strong>Current Balance: </strong>${user.balance.toFixed(2)}</p>
                    </div>
                )}
                {activeView === 'balance' && <Balance />}
                {activeView === 'history' && <RideHistory />}
            </div>
        </div>
    );
}