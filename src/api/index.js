import axios from 'axios';

export * from './auth';
export * from './subject';
export * from "./assessment";
export * from "./announcement";


export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});
