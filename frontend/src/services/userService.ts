import {callHttp} from "./apiClient.ts";
import type {UpdateBalanceRequest, UpdateLocationRequest} from "../types";

export const getMyUser = () => {
    const url = '/users/me';
    return callHttp(url, 'GET');
}

export const updateBalance = (data: UpdateBalanceRequest) => {
    const url = '/users/balance';
    return callHttp(url, 'PATCH', data);
}

export const updateLocation = (data: UpdateLocationRequest) => {
    const url = '/users/location';
    return callHttp(url, 'PATCH', data);
}