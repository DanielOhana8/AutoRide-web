import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Login from "./components/Auth/Login/Login.tsx";
import Register from "./components/Auth/Register/Register.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import Profile from "./components/Profile/Profile.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";
import PrivateRoute from "./components/Layout/PrivateRoute/PrivateRoute.tsx";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route element={<PrivateRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/profile" element={<Profile />} />
                    </Route>

                    <Route path="*" element={<Navigate to="/login" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}
