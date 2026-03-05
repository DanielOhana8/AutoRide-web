import {callHttp} from "./apiClient.ts";
import type {UpdateBalanceRequest, UpdateLocationRequest} from "../types";

export const updateBalance = (data: UpdateBalanceRequest) => {
    const url = '/users/balance';
    return callHttp(url, 'PATCH', data);
}

export const updateLocation = (data: UpdateLocationRequest) => {
    const url = '/users/location';
    return callHttp(url, 'PATCH', data);
}