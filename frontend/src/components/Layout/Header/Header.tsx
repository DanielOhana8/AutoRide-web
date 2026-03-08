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
        <header className="header">
            <Link to="/dashboard" className="logo-link">
                <img src="/car.svg" alt="AutoRide Logo" className="logo-img" />
                <strong>AutoRide</strong>
            </Link>
            <nav className="nav-links">
                <span className="welcome-text">
                    Hello, {user?.name}
                </span>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/profile">Profile</Link>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </nav>
        </header>
    );
}