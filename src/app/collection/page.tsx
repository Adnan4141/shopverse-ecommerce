"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { TopBanner } from "@/components/common/top-banner";
import { Navbar } from "@/components/common/navbar";
import { SearchBar } from "@/components/common/search-bar";
import { Footer } from "@/components/common/footer";
import { SectionTitle } from "@/components/common/section-title";
import { ProductItem } from "@/components/home/product-item";
import { useShop } from "@/context/shop-context";
import { Product } from "@/data/products";
import { cn } from "@/lib/utils";

export default function CollectionPage() {
  const { products, search, showSearch } = useShop();
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [subCategory, setSubCategory] = useState<string[]>([]);
  const [sortType, setSortType] = useState<string>("relevant");

  const toggleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (category.includes(val)) {
      setCategory((prev) => prev.filter((item) => item !== val));
    } else {
      setCategory((prev) => [...prev, val]);
    }
  };

  const toggleSubCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (subCategory.includes(val)) {
      setSubCategory((prev) => prev.filter((item) => item !== val));
    } else {
      setSubCategory((prev) => [...prev, val]);
    }
  };

  const applyFilter = useMemo(() => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    switch (sortType) {
      case "low-high":
        productsCopy.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        productsCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return productsCopy;
  }, [products, search, showSearch, category, subCategory, sortType]);

  useEffect(() => {
    setFilterProducts(applyFilter);
  }, [applyFilter]);

  return (
    <div className="min-h-screen bg-white text-[#414141] flex flex-col">
      <TopBanner />

      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex-1">
        <Navbar />
        <SearchBar />

        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
          <div className="min-w-60">
            <p
              onClick={() => setShowFilter(!showFilter)}
              className="my-2 text-xl flex items-center cursor-pointer gap-2 font-medium"
            >
              FILTERS
              <Image
                src="/assets/dropdown_icon.png"
                className={cn("h-3 w-auto sm:hidden transition-transform", showFilter ? "rotate-90" : "")}
                style={{ width: "auto" }}
                alt="Toggle Filters"
                width={12}
                height={12}
              />
            </p>

            <div
              className={cn("border border-gray-300 pl-5 py-3 mt-6 sm:block", showFilter ? "block" : "hidden")}
            >
              <p className="mb-3 text-sm font-medium">CATEGORIES</p>
              <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                <label className="flex gap-2 cursor-pointer items-center">
                  <input
                    className="w-3 h-3 accent-black"
                    type="checkbox"
                    value="Men"
                    onChange={toggleCategory}
                  />
                  Men
                </label>
                <label className="flex gap-2 cursor-pointer items-center">
                  <input
                    className="w-3 h-3 accent-black"
                    type="checkbox"
                    value="Women"
                    onChange={toggleCategory}
                  />
                  Women
                </label>
                <label className="flex gap-2 cursor-pointer items-center">
                  <input
                    className="w-3 h-3 accent-black"
                    type="checkbox"
                    value="Kids"
                    onChange={toggleCategory}
                  />
                  Kids
                </label>
              </div>
            </div>

            <div
              className={cn("border border-gray-300 pl-5 py-3 my-5 sm:block", showFilter ? "block" : "hidden")}
            >
              <p className="mb-3 text-sm font-medium">TYPE</p>
              <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
                <label className="flex gap-2 cursor-pointer items-center">
                  <input
                    className="w-3 h-3 accent-black"
                    type="checkbox"
                    value="Topwear"
                    onChange={toggleSubCategory}
                  />
                  Topwear
                </label>
                <label className="flex gap-2 cursor-pointer items-center">
                  <input
                    className="w-3 h-3 accent-black"
                    type="checkbox"
                    value="Bottomwear"
                    onChange={toggleSubCategory}
                  />
                  Bottomwear
                </label>
                <label className="flex gap-2 cursor-pointer items-center">
                  <input
                    className="w-3 h-3 accent-black"
                    type="checkbox"
                    value="Winterwear"
                    onChange={toggleSubCategory}
                  />
                  Winterwear
                </label>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex justify-between text-base sm:text-2xl mb-4 items-center">
              <SectionTitle
                text1="ALL"
                text2="COLLECTIONS"
                className="py-0 text-left text-xl sm:text-2xl"
              />
              <select
                onChange={(e) => setSortType(e.target.value)}
                className="border-2 border-gray-300 text-sm px-2 py-1.5 outline-none rounded bg-white text-gray-700 font-medium"
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="low-high">Sort by: Low to High</option>
                <option value="high-low">Sort by: High to Low</option>
              </select>
            </div>

            {filterProducts.length === 0 ? (
              <p className="text-center text-gray-500 py-16">
                No products found matching your filter criteria.
              </p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                {filterProducts.map((item) => (
                  <ProductItem key={item._id} product={item} />
                ))}
              </div>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}
