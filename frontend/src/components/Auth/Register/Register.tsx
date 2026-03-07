import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../../context/AuthContext.tsx";
import {registerService} from "../../../services/authService.ts";

export default function Register() {
    const [name, setName] = useState('');
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
            const data = await registerService({ name, email, password });
            login(data);
            navigate('/dashboard', { replace: true });
        } catch (err: any) {
            setError(err.message || 'register error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>Register</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'loading' : 'register'}
                </button>
            </form>
            <p>
                You already have an account? <Link to="/login">login here</Link>
            </p>
        </div>
    )
}