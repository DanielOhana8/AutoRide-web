import {callHttp} from "./apiClient.ts";
import type {EndRideRequest} from "../types";

export const startRide = () => {
    const url = '/rides/start';
    return callHttp(url, 'POST');
}

export const endRide = (data: EndRideRequest) => {
    const url = '/rides/end';
    return callHttp(url, 'PATCH', data);
}

export const getRidesHistory = () => {
    const url = '/rides';
    return callHttp(url, 'GET');
}

export const getAllActiveRides = () => {
    const url = '/rides/active';
    return callHttp(url, 'GET');
}

export const getUserRidesHistory = () => {
    const url = '/rides/user';
    return callHttp(url, 'GET');
}

export const getUserActiveRide = () => {
    const url = '/rides/user/active';
    return callHttp(url, 'GET');
}

export const getCarRidesHistory = (carId: number) => {
    const url = `/rides/car/${carId}`;
    return callHttp(url, 'GET');
};

export const getCarActiveRide = (carId: number) => {
    const url = `/rides/car/${carId}/active`;
    return callHttp(url, 'GET');
};