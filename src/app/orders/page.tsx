"use client";

import React from "react";
import Image from "next/image";
import { TopBanner } from "@/components/common/top-banner";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { SectionTitle } from "@/components/common/section-title";
import { useShop } from "@/context/shop-context";

export default function OrdersPage() {
  const { products, currency } = useShop();

  const orderList = products.slice(0, 3);

  return (
    <div className="min-h-screen bg-white text-[#414141] flex flex-col">
      <TopBanner />

      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex-1">
        <Navbar />

        <div className="border-t pt-16">
          <div className="text-2xl">
            <SectionTitle
              text1="MY"
              text2="ORDERS"
              className="text-left py-0 mb-4"
            />
          </div>

          <div>
            {orderList.map((item, index) => (
              <div
                key={index}
                className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >
                <div className="flex items-start gap-6 text-sm">
                  <Image
                    className="w-16 sm:w-20 object-cover aspect-square"
                    src={item.image[0]}
                    alt={item.name}
                    width={80}
                    height={80}
                  />
                  <div>
                    <p className="sm:text-base font-medium">{item.name}</p>
                    <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                      <p className="text-lg">
                        {currency}
                        {item.price}
                      </p>
                      <p>Quantity: 1</p>
                      <p>Size: M</p>
                    </div>
                    <p className="mt-2 text-xs text-gray-400">
                      Date: <span className="text-gray-500">25, Jul, 2026</span>
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      Payment: <span className="text-gray-500">COD</span>
                    </p>
                  </div>
                </div>

                <div className="md:w-1/2 flex justify-between">
                  <div className="flex items-center gap-2">
                    <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                    <p className="text-sm md:text-base">Order Placed</p>
                  </div>
                  <button
                    type="button"
                    className="border px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-50 transition-colors"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
