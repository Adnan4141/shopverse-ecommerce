"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useShop } from "@/context/shop-context";
import { useRouter } from "next/navigation";

export const AdminNavbar = () => {
  const { logoutUser } = useShop();
  const router = useRouter();

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  return (
    <div className="flex items-center py-3 px-[4%] justify-between border-b bg-white">
      <div className="flex items-center gap-3">
        <Link href="/">
          <Image
            src="/assets/logo.png"
            className="w-32 h-auto"
            alt="Shopverse"
            width={128}
            height={40}
          />
        </Link>
        <span className="text-xs bg-black text-white px-2.5 py-0.5 rounded-full font-medium">
          Admin Panel
        </span>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="text-xs font-medium text-gray-600 hover:text-black transition-colors"
        >
          View Storefront
        </Link>
        <button
          onClick={handleLogout}
          className="bg-gray-600 hover:bg-black text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm cursor-pointer transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};
