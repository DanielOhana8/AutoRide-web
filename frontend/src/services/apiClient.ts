const BASE_URL = 'http://localhost:8080/api';

export const callHttp = async (restUrl: string, method: string, body?: any) => {
    const url = BASE_URL + restUrl;
    const token = localStorage.getItem('token');

    const headers: HeadersInit = {
        'Content-Type': 'application/json'
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const options: RequestInit = {
        method: method,
        headers: headers
    }

    if (body && method !== 'GET') {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return;
    }

    if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || `Network error: ${response.status}`);
    }

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    }

    return response.text();
}