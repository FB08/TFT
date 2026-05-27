"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const menuItems = [
  {
    name: "캘린더",
    href: "/user/calendar",
  },
  {
    name: "학생관리",
    href: "/user/students",
  },
  {
    name: "커리큘럼",
    href: "/user/curriculum",
  },
  {
    name: "마이페이지",
    href: "/user/mypage",
  },
];

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="h-screen flex bg-slate-100">

      {/* sidebar */}
      <aside
        className="
          w-64
          bg-slate-900
          text-white
          flex
          flex-col
          px-6
          py-8
          shadow-xl
        "
      >
        {/* logo */}
        <Link
          href="/user/calendar"
          className="
            text-3xl
            font-bold
            tracking-wider
            mb-12
            text-blue-400
          "
        >
          TFT
        </Link>

        {/* nav */}
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const isActive =
              pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  rounded-xl
                  px-4
                  py-3
                  font-medium
                  transition
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }
                `}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* bottom */}
        <div className="mt-auto pt-8 border-t border-slate-700">
          <div className="flex items-center gap-3">
            <div
              className="
                w-10
                h-10
                rounded-full
                bg-slate-700
                flex
                items-center
                justify-center
                text-xl
              "
            >
              👤
            </div>

            <div className="text-sm text-slate-300">
              과외 선생님
            </div>
          </div>
        </div>
      </aside>

      {/* page content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div
          className="
            min-h-full
            rounded-3xl
            bg-white
            p-8
            shadow-sm
          "
        >
          {children}
        </div>
      </main>
    </div>
  );
}