import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.tsx';

export default function Header() {
    const { token, logout, user } = useAuth();
    const navigate = useNavigate();

    if (!token) {
        return null;
    }

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header>
            <div>
                <strong>AutoRide</strong>
            </div>
            <nav>
                <span>
                    Hello, {user?.name}
                </span>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/profile">Profile</Link>
                <button onClick={handleLogout}>Logout</button>
            </nav>
        </header>
    );
}