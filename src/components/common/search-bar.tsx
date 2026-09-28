"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useShop } from "@/context/shop-context";
import { X } from "lucide-react";

export const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useShop();
  const pathname = usePathname();

  const isCollectionPage = pathname.includes("collection");

  useEffect(() => {
    if (!isCollectionPage) {
      setShowSearch(false);
    }
  }, [pathname, isCollectionPage, setShowSearch]);

  if (!showSearch) return null;

  return (
    <div className="border-t border-b bg-gray-50 text-center py-4 transition-all">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-2 mx-3 rounded-full w-3/4 sm:w-1/2 bg-white">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 outline-none bg-inherit text-sm placeholder:text-gray-400"
          type="text"
          placeholder="Search products..."
          autoFocus
        />
        <Image
          src="/assets/search_icon.png"
          className="w-4 h-auto cursor-pointer"
          alt="Search"
          width={16}
          height={16}
        />
      </div>
      <button
        type="button"
        onClick={() => setShowSearch(false)}
        aria-label="Close search"
        className="inline cursor-pointer hover:opacity-75 align-middle ml-2"
      >
        <X className="w-4 h-4 text-gray-500 inline" />
      </button>
    </div>
  );
};
