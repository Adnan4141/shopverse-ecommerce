"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, products } from "@/data/products";
import { toast } from "sonner";

interface CartItems {
  [itemId: string]: {
    [size: string]: number;
  };
}

interface ShopContextType {
  products: Product[];
  currency: string;
  delivery_fee: number;
  search: string;
  setSearch: (search: string) => void;
  showSearch: boolean;
  setShowSearch: (show: boolean) => void;
  cartItems: CartItems;
  addToCart: (itemId: string, size: string) => void;
  getCartCount: () => number;
  updateQuantity: (itemId: string, size: string, quantity: number) => void;
  getCartAmount: () => number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState<CartItems>({});

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("forever_cart");
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
    } catch {
      // fallback
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("forever_cart", JSON.stringify(cartItems));
    } catch {
      // fallback
    }
  }, [cartItems]);

  const addToCart = (itemId: string, size: string) => {
    if (!size) {
      toast.error("Please select a product size!");
      return;
    }

    const cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
    toast.success("Added to cart successfully!");
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch {
          // ignore
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = (itemId: string, size: string, quantity: number) => {
    const cartData = structuredClone(cartItems);
    if (quantity === 0) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }
    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      const itemInfo = products.find((product) => product._id === items);
      if (itemInfo) {
        for (const item in cartItems[items]) {
          try {
            if (cartItems[items][item] > 0) {
              totalAmount += itemInfo.price * cartItems[items][item];
            }
          } catch {
            // ignore
          }
        }
      }
    }
    return totalAmount;
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopContextProvider");
  }
  return context;
};
