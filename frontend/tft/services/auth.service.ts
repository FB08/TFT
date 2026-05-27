import { api } from '@/lib/axios';
export interface SignupRequest {
    name: string;
    userId: string;
    password: string;
}

export interface LoginRequest {
    userId: string;
    password: string;
}

export const authService = {
    signup: async (payload: SignupRequest) => {
        const { data } = await api.post(
            '/auth/signup',
            payload
        );
        return data;
    },

    login: async (payload: LoginRequest) => {
        const { data } = await api.post(
            '/auth/login',
            payload
        );
        return data;
    }
}