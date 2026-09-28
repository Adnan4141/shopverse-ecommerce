"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TopBanner } from "@/components/common/top-banner";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { useShop } from "@/context/shop-context";
import { ShoppingBag, Shield, LogOut, ArrowRight } from "lucide-react";

export default function ProfilePage() {
  const { user, token, logoutUser, getCartCount } = useShop();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  if (!token) {
    return (
      <div className="min-h-screen bg-white text-[#414141] flex flex-col">
        <TopBanner />
        <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex-1 flex items-center justify-center py-20">
          <p className="text-sm text-gray-500">Redirecting to login...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-[#414141] flex flex-col">
      <TopBanner />

      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex-1">
        <Navbar />

        <div className="max-w-4xl mx-auto my-12 border-t pt-8">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-full md:w-1/3 border border-gray-200 rounded-2xl p-6 bg-white shadow-xs text-center">
              <div className="w-20 h-20 bg-pink-100 text-pink-700 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 border-2 border-pink-200">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>

              <h2 className="text-xl font-bold text-gray-900">{user?.name || "Customer"}</h2>
              <p className="text-xs text-gray-500 mt-1">{user?.email}</p>

              <div className="mt-3">
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-800 text-[11px] font-semibold uppercase tracking-wider rounded-full">
                  {user?.role === "admin" ? "Super Admin" : "Verified Customer"}
                </span>
              </div>

              <hr className="my-6 border-gray-100" />

              <div className="flex flex-col gap-2 text-left">
                <Link
                  href="/orders"
                  className="flex items-center justify-between p-2.5 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors text-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-4 h-4 text-gray-500" />
                    <span>My Orders</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </Link>

                {user?.role === "admin" && (
                  <Link
                    href="/admin"
                    className="flex items-center justify-between p-2.5 rounded-lg hover:bg-pink-50 text-sm font-semibold transition-colors text-pink-700"
                  >
                    <div className="flex items-center gap-3">
                      <Shield className="w-4 h-4 text-pink-600" />
                      <span>Admin Dashboard</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-pink-400" />
                  </Link>
                )}

                <button
                  type="button"
                  onClick={logoutUser}
                  className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-red-50 text-sm font-medium transition-colors text-red-600 mt-2 cursor-pointer w-full text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>

            <div className="flex-1 w-full flex flex-col gap-6">
              <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-xs">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Account Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">Full Name</p>
                    <p className="font-semibold text-gray-800">{user?.name}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">Email Address</p>
                    <p className="font-semibold text-gray-800 truncate">{user?.email}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">Items in Cart</p>
                    <p className="font-semibold text-gray-800">{getCartCount()} items</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">Account Status</p>
                    <p className="font-semibold text-green-600">Active & Secured</p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-xs">
                <h3 className="text-lg font-bold text-gray-900 mb-2">Shopverse Membership Perks</h3>
                <p className="text-xs text-gray-500 mb-4">Enjoy your exclusive benefits as a registered customer.</p>
                <ul className="text-xs text-gray-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500 font-bold">✓</span> Free express delivery on orders above 0
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500 font-bold">✓</span> 7 Days hassle-free returns and instant replacement
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500 font-bold">✓</span> Early access to new collection drops and seasonal sales
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
