import {callHttp} from "./apiClient.ts";
import type {UpdateIsAvailableRequest, UpdateLocationRequest} from "../types";

export const findClosestAvailableCar = (x: number, y: number) => {
    const url = `/cars/closest?x=${x}&y=${y}`;
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