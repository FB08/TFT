import { api } from '@/lib/axios';
export interface SignupRequest {
    name: string;
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
    }
        
}