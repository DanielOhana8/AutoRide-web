import {useAuth} from "../../../context/AuthContext.tsx";
import {Navigate, Outlet} from "react-router-dom";

export default function PrivateRoute() {
    const { token } = useAuth();
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}