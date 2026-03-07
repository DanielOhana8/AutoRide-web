import {callHttp} from "./apiClient.ts";
import type {LoginRequest, RegisterRequest} from "../types";

export const loginService = (data: LoginRequest) => {
    const url = '/auth/login';
    return callHttp(url, 'POST', data);
}

export const registerService = (data: RegisterRequest) => {
    const url = '/auth/register';
    return callHttp(url, 'POST', data);
}