import {callHttp} from "./apiClient.ts";
import type {UpdateIsAvailableRequest, UpdateLocationRequest} from "../types";

export const findClosestAvailableCar = (latitude: number, longitude: number) => {
    const url = `/cars/closest?latitude=${latitude}&longitude=${longitude}`;
    return callHttp(url, 'GET');
}

export const updateCarAvailable = (carId: number, data: UpdateIsAvailableRequest) => {
    const url = `/cars/${carId}/available`;
    return callHttp(url, 'PATCH', data);
}

export const updateCarLocation = (carId: number, data: UpdateLocationRequest) => {
    const url = `/cars/${carId}/location`;
    return callHttp(url, 'PATCH', data);
}

export const getCarById = (carId: number) => {
    const url = `/cars/${carId}`;
    return callHttp(url, 'GET');
}