"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useShop } from "@/context/shop-context";

export const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { getCartCount, setShowSearch } = useShop();

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "COLLECTION", href: "/collection" },
    { name: "ABOUT", href: "/about" },
    { name: "CONTACT", href: "/contact" },
  ];

  const handleSearchClick = () => {
    setShowSearch(true);
    if (!pathname.includes("/collection")) {
      router.push("/collection");
    }
  };

  const cartCount = getCartCount();

  return (
    <header className="relative">
      <div className="flex items-center justify-between py-5 font-medium">
        <Link href="/" className="cursor-pointer">
          <Image
            src="/assets/logo.png"
            className="w-36 h-auto"
            alt="Shopverse Logo"
            width={144}
            height={44}
            priority
          />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden sm:flex gap-5 text-sm text-gray-700 items-center">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center gap-1 group py-1"
              >
                <p
                  className={cn(
                    "hover:text-black transition-colors font-medium text-xs tracking-wider",
                    isActive ? "text-black font-semibold" : "text-gray-700"
                  )}
                >
                  {item.name}
                </p>
                <hr
                  className={cn(
                    "w-2/4 border-none h-[1.5px] bg-gray-700 transition-all",
                    isActive ? "block" : "hidden group-hover:block"
                  )}
                />
              </Link>
            );
          })}
          <Link
            href="https://admin.foreverbuy.in/"
            target="_blank"
            className="border px-5 text-xs py-1 rounded-full -mt-0.5 hover:bg-black hover:text-white transition-colors"
          >
            <p className="mt-0.5 font-medium">Admin Panel</p>
          </Link>
        </ul>

        {/* Action Icons */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={handleSearchClick}
            aria-label="Search"
            className="cursor-pointer hover:opacity-75 transition-opacity"
          >
            <Image
              src="/assets/search_icon.png"
              className="w-5 h-auto cursor-pointer"
              alt="Search"
              width={20}
              height={20}
            />
          </button>

          <div className="group relative">
            <button
              type="button"
              aria-label="Profile"
              className="cursor-pointer hover:opacity-75 transition-opacity block"
            >
              <Image
                src="/assets/profile_icon.png"
                className="w-5 h-auto cursor-pointer"
                alt="Profile"
                width={20}
                height={20}
              />
            </button>
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-md border text-sm">
                <Link
                  href="/profile"
                  className="cursor-pointer hover:text-black transition-colors"
                >
                  My Profile
                </Link>
                <Link
                  href="/orders"
                  className="cursor-pointer hover:text-black transition-colors"
                >
                  Orders
                </Link>
                <button
                  type="button"
                  className="cursor-pointer text-left hover:text-black transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          <Link href="/cart" className="relative cursor-pointer hover:opacity-85">
            <Image
              src="/assets/cart_icon.png"
              className="w-5 min-w-5 h-auto"
              alt="Cart"
              width={20}
              height={20}
            />
            <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] font-semibold">
              {cartCount}
            </p>
          </Link>

          {/* Mobile hamburger menu */}
          <button
            type="button"
            onClick={() => setVisible(true)}
            aria-label="Open menu"
            className="sm:hidden cursor-pointer"
          >
            <Image
              src="/assets/menu_icon.png"
              className="w-5 h-auto cursor-pointer"
              alt="Menu"
              width={20}
              height={20}
            />
          </button>
        </div>

        {/* Sidebar Menu for Mobile */}
        <div
          className={cn(
            "fixed top-0 right-0 bottom-0 overflow-hidden bg-white transition-all z-50 shadow-2xl",
            visible ? "w-full sm:w-80" : "w-0"
          )}
        >
          <div className="flex flex-col text-gray-600 h-full">
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 border-b"
            >
              <Image
                src="/assets/dropdown_icon.png"
                className="h-4 w-auto rotate-180"
                alt="Back"
                width={16}
                height={16}
              />
              <p className="font-medium text-gray-700">Back</p>
            </div>
            {navLinks.map((item) => (
              <Link
                key={item.name}
                onClick={() => setVisible(false)}
                className="py-3 pl-6 border-b text-sm font-medium hover:bg-gray-50 transition-colors"
                href={item.href}
              >
                {item.name}
              </Link>
            ))}
            <Link
              onClick={() => setVisible(false)}
              className="py-3 pl-6 border-b text-sm font-medium hover:bg-gray-50 transition-colors"
              href="https://admin.foreverbuy.in/"
              target="_blank"
            >
              Admin Panel
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
