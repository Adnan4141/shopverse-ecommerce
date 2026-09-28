"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TopBanner } from "@/components/common/top-banner";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { SectionTitle } from "@/components/common/section-title";
import { CartTotal } from "@/components/common/cart-total";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function PlaceOrderPage() {
  const router = useRouter();
  const [method, setMethod] = useState<"stripe" | "razorpay" | "cod">("cod");

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Order placed successfully!");
    setTimeout(() => {
      router.push("/orders");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white text-[#414141] flex flex-col">
      <TopBanner />

      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex-1">
        <Navbar />

        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col sm:flex-row justify-between gap-8 pt-5 sm:pt-14 min-h-[80vh] border-t"
        >
          <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
            <div className="text-xl sm:text-2xl my-3">
              <SectionTitle
                text1="DELIVERY"
                text2="INFORMATION"
                className="text-left py-0 mb-4"
              />
            </div>
            <div className="flex gap-3">
              <input
                required
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none"
                type="text"
                placeholder="First name"
              />
              <input
                required
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none"
                type="text"
                placeholder="Last name"
              />
            </div>
            <input
              required
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none"
              type="email"
              placeholder="Email address"
            />
            <input
              required
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none"
              type="text"
              placeholder="Street"
            />
            <div className="flex gap-3">
              <input
                required
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none"
                type="text"
                placeholder="City"
              />
              <input
                required
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none"
                type="text"
                placeholder="State"
              />
            </div>
            <div className="flex gap-3">
              <input
                required
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none"
                type="number"
                placeholder="Zipcode"
              />
              <input
                required
                className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none"
                type="text"
                placeholder="Country"
              />
            </div>
            <input
              required
              className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-sm outline-none"
              type="tel"
              placeholder="Phone"
            />
          </div>

          <div className="mt-8 flex-1 sm:max-w-[480px]">
            <CartTotal />

            <div className="mt-12">
              <div className="text-xl sm:text-2xl my-3">
                <SectionTitle
                  text1="PAYMENT"
                  text2="METHOD"
                  className="text-left py-0 mb-4"
                />
              </div>

              <div className="flex gap-3 flex-col lg:flex-row">
                <div
                  onClick={() => setMethod("stripe")}
                  className={cn(
                    "flex items-center gap-3 border p-2 px-3 cursor-pointer",
                    method === "stripe" ? "border-green-500 bg-green-50/50" : ""
                  )}
                >
                  <p
                    className={cn(
                      "min-w-3.5 h-3.5 border rounded-full",
                      method === "stripe" ? "bg-green-500" : ""
                    )}
                  ></p>
                  <span className="font-semibold text-gray-700 text-sm">
                    STRIPE
                  </span>
                </div>

                <div
                  onClick={() => setMethod("razorpay")}
                  className={cn(
                    "flex items-center gap-3 border p-2 px-3 cursor-pointer",
                    method === "razorpay" ? "border-green-500 bg-green-50/50" : ""
                  )}
                >
                  <p
                    className={cn(
                      "min-w-3.5 h-3.5 border rounded-full",
                      method === "razorpay" ? "bg-green-500" : ""
                    )}
                  ></p>
                  <span className="font-semibold text-blue-600 text-sm">
                    RAZORPAY
                  </span>
                </div>

                <div
                  onClick={() => setMethod("cod")}
                  className={cn(
                    "flex items-center gap-3 border p-2 px-3 cursor-pointer",
                    method === "cod" ? "border-green-500 bg-green-50/50" : ""
                  )}
                >
                  <p
                    className={cn(
                      "min-w-3.5 h-3.5 border rounded-full",
                      method === "cod" ? "bg-green-500" : ""
                    )}
                  ></p>
                  <p className="text-gray-500 text-xs font-semibold">
                    CASH ON DELIVERY
                  </p>
                </div>
              </div>

              <div className="w-full text-end mt-8">
                <button
                  type="submit"
                  className="bg-black text-white px-16 py-3 text-sm hover:bg-gray-800 transition-colors"
                >
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>
        </form>

        <Footer />
      </div>
    </div>
  );
}
