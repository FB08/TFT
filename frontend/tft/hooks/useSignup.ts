"use client"
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";

export function useSignup() {
    const router = useRouter();

    return useMutation({
        mutationFn: authService.signup,
        onSuccess: () => {
            toast.success('회원가입이 완료되었습니다!');

            setTimeout(() => {
                router.push('/');
            }, 500);
        },

        onError: (e) => {
            toast.error('회원가입에 실패했습니다. 다시 시도해주세요.' + e.message);
        }
    });
}