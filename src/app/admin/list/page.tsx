"use client";

import React from "react";
import Image from "next/image";
import { useShop } from "@/context/shop-context";
import { toast } from "sonner";
import { X } from "lucide-react";

export default function AdminListPage() {
  const { products, setProducts, currency } = useShop();

  const removeProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item._id !== id));
    toast.success("Product removed successfully");
  };

  return (
    <div>
      <p className="mb-4 font-semibold text-lg text-gray-800">All Products List</p>

      <div className="flex flex-col gap-2">
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-3 border bg-gray-100 text-sm font-medium text-gray-700">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {products.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-3 border text-sm bg-white hover:bg-gray-50 transition-colors"
          >
            <Image
              className="w-12 h-12 object-cover rounded"
              src={item.image[0]}
              alt={item.name}
              width={48}
              height={48}
            />
            <p className="font-medium text-gray-800 truncate pr-2">{item.name}</p>
            <p className="text-gray-500">{item.category}</p>
            <p className="font-semibold text-gray-800">
              {currency}
              {item.price}
            </p>
            <div className="text-right md:text-center">
              <button
                type="button"
                onClick={() => removeProduct(item._id)}
                className="cursor-pointer text-gray-400 hover:text-red-500 transition-colors p-1"
                aria-label="Delete"
              >
                <X className="w-5 h-5 inline" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
