import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login/Login.tsx";
import Register from "./components/Auth/Register/Register.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import Profile from "./components/Profile/Profile.tsx";
import { AuthProvider, useAuth } from "./context/AuthContext.tsx";
import PrivateRoute from "./components/Layout/PrivateRoute/PrivateRoute.tsx";
import Header from "./components/Layout/Header/Header.tsx";

function AppRoutes() {
    const { token } = useAuth();

    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/login" element={token ? <Navigate to="/dashboard" replace /> : <Login />} />
                <Route path="/register" element={token ? <Navigate to="/dashboard" replace /> : <Register />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="*" element={<Navigate to={token ? "/dashboard" : "/login"} replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    );
}