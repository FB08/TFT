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
    <main className="min-h-screen bg-slate-900 flex items-center justify-center px-6">
      <div className="w-full max-w-xl rounded-3xl bg-white/95 backdrop-blur p-10 shadow-2xl">

        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center text-5xl shadow-inner">
            👤
          </div>

          <h1 className="mt-5 text-3xl font-bold text-slate-800">
            돌아오신 걸 환영합니다
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            로그인하고 수업 관리를 시작하세요
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              ID
            </label>

            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="아이디"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleLogin();
              }}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="button"
            onClick={handleLogin}
            disabled={loginMutation.isPending}
            className="
              w-full
              rounded-xl
              bg-blue-600
              hover:bg-blue-700
              active:scale-[0.98]
              text-white
              font-semibold
              py-3
              shadow-lg
              transition
            "
          >
            {loginMutation.isPending ? "로그인 중..." : "로그인"}
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-slate-500">
          계정이 없으신가요?{" "}
          <Link
            href="/signup"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            회원가입
          </Link>
        </div>
      </div>
    </main>
  );
}