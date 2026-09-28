"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TopBanner } from "@/components/common/top-banner";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { SectionTitle } from "@/components/common/section-title";
import { CartTotal } from "@/components/common/cart-total";
import { useShop } from "@/context/shop-context";
import { Trash2 } from "lucide-react";

interface CartDataItem {
  _id: string;
  size: string;
  quantity: number;
}

export default function CartPage() {
  const { products, currency, cartItems, updateQuantity } = useShop();
  const [cartData, setCartData] = useState<CartDataItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const tempData: CartDataItem[] = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="min-h-screen bg-white text-[#414141] flex flex-col">
      <TopBanner />

      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex-1">
        <Navbar />

        <div className="border-t pt-14">
          <div className="text-2xl mb-3">
            <SectionTitle
              text1="YOUR"
              text2="CART"
              className="text-left py-0 mb-4"
            />
          </div>

          <div>
            {cartData.length === 0 ? (
              <div className="py-20 text-center text-gray-500">
                <p className="text-lg">Your cart is currently empty.</p>
                <Link
                  href="/collection"
                  className="mt-4 inline-block bg-black text-white px-6 py-2.5 text-sm"
                >
                  SHOP NOW
                </Link>
              </div>
            ) : (
              cartData.map((item, index) => {
                const productData = products.find(
                  (product) => product._id === item._id
                );
                if (!productData) return null;

                return (
                  <div
                    key={index}
                    className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                  >
                    <div className="flex items-start gap-6">
                      <Image
                        className="w-16 sm:w-20 object-cover aspect-square"
                        src={productData.image[0]}
                        alt={productData.name}
                        width={80}
                        height={80}
                      />
                      <div>
                        <p className="text-xs sm:text-lg font-medium">
                          {productData.name}
                        </p>
                        <div className="flex items-center gap-5 mt-2">
                          <p>
                            {currency}
                            {productData.price}
                          </p>
                          <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 text-xs font-semibold">
                            {item.size}
                          </p>
                        </div>
                      </div>
                    </div>

                    <input
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val > 0) {
                          updateQuantity(item._id, item.size, val);
                        }
                      }}
                      className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 text-center font-medium"
                      type="number"
                      min={1}
                      defaultValue={item.quantity}
                    />

                    <button
                      type="button"
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                      className="cursor-pointer text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>

          {cartData.length > 0 && (
            <div className="flex justify-end my-20">
              <div className="w-full sm:w-[450px]">
                <CartTotal />
                <div className="w-full text-end">
                  <button
                    onClick={() => router.push("/place-order")}
                    className="bg-black text-white text-sm my-8 px-8 py-3 hover:bg-gray-800 transition-colors"
                  >
                    PROCEED TO CHECKOUT
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}
