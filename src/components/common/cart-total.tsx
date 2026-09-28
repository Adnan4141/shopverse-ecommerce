import React from "react";
import { useShop } from "@/context/shop-context";
import { SectionTitle } from "@/components/common/section-title";

export const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useShop();

  const cartAmount = getCartAmount();

  return (
    <div className="w-full">
      <div className="text-2xl">
        <SectionTitle
          text1="CART"
          text2="TOTALS"
          className="text-left py-0 mb-4"
        />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency} {cartAmount}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency} {cartAmount === 0 ? 0 : delivery_fee}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between font-bold">
          <p>Total</p>
          <p>
            {currency}{" "}
            {cartAmount === 0 ? 0 : cartAmount + delivery_fee}.00
          </p>
        </div>
      </div>
    </div>
  );
};
