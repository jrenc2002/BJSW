import axios, { AxiosInstance, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';

const service: AxiosInstance = axios.create({
    timeout: 5000,
    baseURL: process.env.NODE_ENV ? '/api' : 'http://192.168.3.137:8080/api'
    // baseURL: import.meta.env.DEV ? '/api' : '/api'

});

service.interceptors.request.use(
    (config: AxiosRequestConfig): any => {
        if (config.headers)
            config.headers['Authorization'] = String(localStorage.getItem('token'))
        return config;
    },
    (error: AxiosError) => {
        console.log(error);
        return Promise.reject();
    }
);


service.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            console.log(response.status)
            return Promise.reject(response);
        }
    },
    (error: AxiosError) => {
        console.log(error);
        if (error.response?.status === 401) {
            localStorage.removeItem('token')
        }
        return Promise.reject();
    }
);

export default service;
