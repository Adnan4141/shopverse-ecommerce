"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, products as initialProducts } from "@/data/products";
import { toast } from "sonner";

interface CartItems {
  [itemId: string]: {
    [size: string]: number;
  };
}

export interface User {
  name: string;
  email: string;
  role: "customer" | "admin";
}

interface ShopContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
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
  token: string | null;
  user: User | null;
  loginUser: (token: string, user: User) => void;
  logoutUser: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const currency = "$";
  const delivery_fee = 10;
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState<CartItems>({});
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("shopverse_cart");
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
      const storedToken = localStorage.getItem("shopverse_token");
      const storedUser = localStorage.getItem("shopverse_user");
      if (storedToken) {
        setToken(storedToken);
      }
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      // fallback
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("shopverse_cart", JSON.stringify(cartItems));
    } catch {
      // fallback
    }
  }, [cartItems]);

  const loginUser = (userToken: string, userData: User) => {
    setToken(userToken);
    setUser(userData);
    localStorage.setItem("shopverse_token", userToken);
    localStorage.setItem("shopverse_user", JSON.stringify(userData));
  };

  const logoutUser = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("shopverse_token");
    localStorage.removeItem("shopverse_user");
    toast.info("Logged out successfully");
  };

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
        setProducts,
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
        token,
        user,
        loginUser,
        logoutUser,
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
