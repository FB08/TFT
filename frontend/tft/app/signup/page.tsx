"use client";

import React, { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

const Signup = () => {
  const [name, setName] = useState("");
  const [userId, setId] = useState("");
  const [password, setPassword] = useState("");

  const signupMutation = useSignup();

  const handleSignup = () => {
    signupMutation.mutate({ name, userId, password });
  };

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center px-6">
      <div className="w-full max-w-xl rounded-3xl bg-white/95 backdrop-blur shadow-2xl p-10">

        <div className="flex flex-col items-center mb-10">
          <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center text-5xl shadow-inner">
            👤
          </div>

          <h1 className="mt-5 text-3xl font-bold text-slate-800">
            회원가입
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            계정을 만들고 수업 관리를 시작하세요
          </p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-medium text-slate-700">
              Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-slate-700">
                ID
              </label>

              <button
                type="button"
                className="
                  px-3 py-1
                  rounded-lg
                  bg-slate-200
                  hover:bg-slate-300
                  text-sm
                  transition
                "
              >
                중복확인
              </button>
            </div>

            <input
              type="text"
              value={userId}
              onChange={(e) => setId(e.target.value)}
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
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="button"
            onClick={handleSignup}
            disabled={signupMutation.isPending}
            className="
              w-full
              mt-4
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
            {signupMutation.isPending ? "가입 중..." : "회원가입"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default Signup;