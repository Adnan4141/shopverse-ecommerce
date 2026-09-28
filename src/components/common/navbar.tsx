"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useShop } from "@/context/shop-context";
import { User, LogOut, LayoutDashboard, ShoppingBag, ShieldCheck } from "lucide-react";

export const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { getCartCount, setShowSearch, user, token, logoutUser } = useShop();

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
        <Link href="/" className="cursor-pointer group flex items-center gap-1">
          <Image
            src="/assets/logo.png"
            className="w-36 h-auto transition-transform group-hover:scale-[1.02]"
            alt="Shopverse Logo"
            width={144}
            height={44}
            priority
          />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden sm:flex gap-6 text-sm text-gray-700 items-center">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="relative py-1 group flex flex-col items-center"
              >
                <p
                  className={cn(
                    "text-xs font-semibold tracking-wider transition-colors duration-200",
                    isActive ? "text-black" : "text-gray-600 hover:text-black"
                  )}
                >
                  {item.name}
                </p>
                <span
                  className={cn(
                    "h-[2px] bg-black transition-all duration-300 rounded-full",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            );
          })}
          <Link
            href="/admin"
            className="border border-gray-800 text-gray-800 px-4 py-1.5 text-xs rounded-full font-semibold hover:bg-black hover:text-white transition-all shadow-xs flex items-center gap-1.5"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Panel</span>
          </Link>
        </ul>

        {/* Action Icons */}
        <div className="flex items-center gap-5 sm:gap-6">
          <button
            type="button"
            onClick={handleSearchClick}
            aria-label="Search"
            className="cursor-pointer hover:opacity-75 transition-opacity p-1.5 hover:bg-gray-100 rounded-full"
          >
            <Image
              src="/assets/search_icon.png"
              className="w-5 h-auto cursor-pointer"
              alt="Search"
              width={20}
              height={20}
            />
          </button>

          {/* User Profile Dropdown */}
          <div className="group relative">
            <button
              type="button"
              onClick={() => !token && router.push("/login")}
              aria-label="Profile"
              className="cursor-pointer hover:opacity-75 transition-opacity block p-1.5 hover:bg-gray-100 rounded-full"
            >
              <Image
                src="/assets/profile_icon.png"
                className="w-5 h-auto cursor-pointer"
                alt="Profile"
                width={20}
                height={20}
              />
            </button>

            {token ? (
              <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-3 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
                <div className="flex flex-col w-48 py-3 px-4 bg-white text-gray-700 rounded-xl shadow-xl border border-gray-100 text-sm">
                  <div className="border-b pb-2 mb-2">
                    <p className="font-semibold text-xs text-gray-900 truncate">
                      {user?.name || "Customer"}
                    </p>
                    <p className="text-[11px] text-gray-400 truncate">{user?.email}</p>
                    <span className="inline-block mt-1 text-[9px] uppercase px-1.5 py-0.5 rounded font-bold tracking-wider bg-gray-100 text-gray-700">
                      {user?.role || "customer"}
                    </span>
                  </div>

                  <Link
                    href="/profile"
                    className="flex items-center gap-2.5 py-1.5 px-2 rounded-md hover:bg-gray-50 text-xs font-medium transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-gray-500" />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    href="/orders"
                    className="flex items-center gap-2.5 py-1.5 px-2 rounded-md hover:bg-gray-50 text-xs font-medium transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-gray-500" />
                    <span>My Orders</span>
                  </Link>

                  {user?.role === "admin" && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-2.5 py-1.5 px-2 rounded-md hover:bg-pink-50 text-xs font-semibold text-pink-700 transition-colors"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-pink-600" />
                      <span>Admin Panel</span>
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={logoutUser}
                    className="flex items-center gap-2.5 py-1.5 px-2 rounded-md hover:bg-red-50 text-xs font-medium text-red-600 transition-colors border-t mt-1 pt-2 w-full text-left"
                  >
                    <LogOut className="w-3.5 h-3.5 text-red-500" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          {/* Cart Icon - with explicit style to fix Next.js warning */}
          <Link
            href="/cart"
            className="relative cursor-pointer hover:opacity-85 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Image
              src="/assets/cart_icon.png"
              className="w-5 min-w-5 h-auto"
              style={{ height: "auto" }}
              alt="Cart"
              width={20}
              height={20}
            />
            <p className="absolute right-0 bottom-0 w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px] font-bold shadow-xs">
              {cartCount}
            </p>
          </Link>

          {/* Mobile hamburger menu */}
          <button
            type="button"
            onClick={() => setVisible(true)}
            aria-label="Open menu"
            className="sm:hidden cursor-pointer p-1.5 hover:bg-gray-100 rounded-full"
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
          <div className="flex flex-col text-gray-700 h-full">
            <div
              onClick={() => setVisible(false)}
              className="flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 border-b"
            >
              <Image
                src="/assets/dropdown_icon.png"
                className="h-4 w-auto rotate-180"
                style={{ width: "auto" }}
                alt="Back"
                width={16}
                height={16}
              />
              <p className="font-semibold text-gray-800">Close Menu</p>
            </div>
            {navLinks.map((item) => (
              <Link
                key={item.name}
                onClick={() => setVisible(false)}
                className="py-3.5 pl-6 border-b text-sm font-semibold hover:bg-gray-50 transition-colors"
                href={item.href}
              >
                {item.name}
              </Link>
            ))}
            <Link
              onClick={() => setVisible(false)}
              className="py-3.5 pl-6 border-b text-sm font-semibold hover:bg-gray-50 transition-colors"
              href="/admin"
            >
              Admin Panel
            </Link>
            {token ? (
              <>
                <Link
                  onClick={() => setVisible(false)}
                  className="py-3.5 pl-6 border-b text-sm font-semibold hover:bg-gray-50 transition-colors"
                  href="/profile"
                >
                  My Profile ({user?.name})
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setVisible(false);
                    logoutUser();
                  }}
                  className="py-3.5 pl-6 text-left border-b text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                onClick={() => setVisible(false)}
                className="py-3.5 pl-6 border-b text-sm font-semibold text-black hover:bg-gray-50 transition-colors"
                href="/login"
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
