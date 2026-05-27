"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";

export default function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useLogin();
  const handleLogin = () => {
    loginMutation.mutate({ userId, password });
  };

  return (
    <main className="min-h-screen bg-zinc-100 flex items-center justify-center px-4">
      <div className="w-full max-w-xl border-[3px] border-black rounded-3xl bg-white p-10 shadow-sm">

        {/* profile */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-24 rounded-full border-2 border-black flex items-center justify-center text-4xl bg-zinc-50">
            👤
          </div>

          <h1 className="mt-4 text-2xl font-semibold text-zinc-900">
            돌아오신걸 환영합니다
          </h1>

          <p className="mt-2 text-sm text-zinc-500">
            로그인하고 수업 관리를 시작하세요
          </p>
        </div>

        {/* form */}
        <div className="border-2 border-blue-400 rounded-2xl p-8 space-y-6">

          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-700">
              ID
            </label>

            <input
              type="text"
              value={userId}
              onChange={(e) =>
                setUserId(e.target.value)
              }
              placeholder="아이디를 입력하세요"
              className="
                w-full
                rounded-xl
                border
                border-zinc-300
                px-4
                py-3
                outline-none
                focus:border-blue-500
                transition
              "
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-zinc-700">
              PW
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="비밀번호를 입력하세요"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin();
                }
              }}
              className="
                w-full
                rounded-xl
                border
                border-zinc-300
                px-4
                py-3
                outline-none
                focus:border-blue-500
                transition
              "
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={handleLogin}
              className="
                text-lg
                font-semibold
                text-zinc-900
                hover:translate-x-1
                transition-transform
              "
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? 'login...' : 'login →'}
            </button>
          </div>
        </div>

        {/* footer */}
        <div className="mt-6 text-center text-sm text-zinc-500">
          계정이 없으신가요?{" "}
          <Link
            href="/signup"
            className="
              underline
              underline-offset-4
              hover:text-zinc-800
              transition
            "
          >
            회원가입
          </Link>
        </div>
      </div>
    </main>
  );
}