"use client";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";

export function useLogin() {
    const router = useRouter();

    return useMutation({
        mutationFn: authService.login,
        onSuccess: () => {
            toast.success('로그인에 성공했습니다!');
            setTimeout(() => {
                router.push('/user/calendar'); // 로그인 성공 후 홈으로 이동
            }, 500);
        },

        onError: (e) => {
            toast.error('로그인에 실패했습니다. 다시 시도해주세요.' + e.message);
        }
    });
}