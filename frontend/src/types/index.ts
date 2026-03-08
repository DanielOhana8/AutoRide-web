export interface User {
    id: number;
    name: string;
    email: string;
    balance: number;
}

export interface Car {
    id: number;
    model: string;
    latitude: number;
    longitude: number;
    isAvailable: boolean;
}

export interface Ride {
    id: number;
    userId: number;
    carId: number;
    startLatitude: number;
    startLongitude: number;
    endLatitude: number | null;
    endLongitude: number | null;
    startTime: string;
    endTime: string | null;
    price: number | null;
}

export interface Auth {
    token: string;
    user: User;
}

export interface UpdateLocationRequest {
    latitude: number;
    longitude: number;
}

export interface UpdateIsAvailableRequest {
    isAvailable: boolean;
}

export interface UpdateBalanceRequest {
    amount: number;
}

export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface EndRideRequest {
    latitude: number;
    longitude: number;
}