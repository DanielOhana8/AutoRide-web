import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../../context/AuthContext.tsx";
import {loginService} from "../../../services/authService.ts";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const data = await loginService({ email, password });
            login(data);
            navigate('/dashboard', { replace: true });
        } catch (err: any) {
            setError(err.message || 'login error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container card">
            <h2 className="auth-title">Login</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="auth-btn" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            <p className="auth-footer">
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    )
}