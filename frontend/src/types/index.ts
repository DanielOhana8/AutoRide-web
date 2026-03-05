export interface User {
    id: number;
    name: string;
    email: string;
    balance: number;
}

export interface Car {
    id: number;
    model: string;
    x: number;
    y:  number;
    isAvailable: boolean;
}

export interface Ride {
    id: number;
    userId: number;
    carId: number;
    startLocationX: number;
    startLocationY: number;
    endLocationX: number | null;
    endLocationY: number | null;
    startTime: string;
    endTime: string | null;
    price: number;
}

export interface Auth {
    token: string;
    user: User;
}

export interface UpdateLocationRequest {
    x: number;
    y: number;
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
    x: number;
    y: number;
}
