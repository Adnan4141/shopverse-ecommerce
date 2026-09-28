"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useShop } from "@/context/shop-context";
import { toast } from "sonner";
import { UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminAddPage() {
  const { setProducts } = useShop();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<"Men" | "Women" | "Kids">("Men");
  const [subCategory, setSubCategory] = useState<"Topwear" | "Bottomwear" | "Winterwear">("Topwear");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>("/products/p_img17.png");

  const availableSizes = ["S", "M", "L", "XL", "XXL"];

  const handleSizeToggle = (size: string) => {
    if (sizes.includes(size)) {
      setSizes((prev) => prev.filter((s) => s !== size));
    } else {
      setSizes((prev) => [...prev, size]);
    }
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (sizes.length === 0) {
      toast.error("Please select at least one size");
      return;
    }

    const newProduct = {
      _id: "prod_" + Date.now(),
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      bestseller,
      sizes,
      image: [selectedImage || "/products/p_img17.png"],
      date: Date.now(),
    };

    setProducts((prev) => [newProduct, ...prev]);
    toast.success("Product added successfully!");

    setName("");
    setDescription("");
    setPrice("");
    setSizes([]);
    setBestseller(false);
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-3">
      <div>
        <p className="mb-2 font-medium">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image-picker" className="cursor-pointer">
            <div className="w-24 h-24 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center bg-white hover:bg-gray-50 rounded">
              <UploadCloud className="w-8 h-8 text-gray-400" />
              <span className="text-[10px] text-gray-400 mt-1">Upload</span>
            </div>
            <input
              id="image-picker"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setSelectedImage(URL.createObjectURL(e.target.files[0]));
                  toast.info("Image selected");
                }
              }}
            />
          </label>
          {selectedImage && (
            <div className="w-24 h-24 border rounded overflow-hidden relative">
              <Image
                src={selectedImage}
                alt="Preview"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </div>

      <div className="w-full max-w-[500px]">
        <p className="mb-2 font-medium">Product name</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2 border rounded text-sm bg-white"
          type="text"
          placeholder="Type here"
          required
        />
      </div>

      <div className="w-full max-w-[500px]">
        <p className="mb-2 font-medium">Product description</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full max-w-[500px] px-3 py-2 border rounded text-sm bg-white"
          rows={4}
          placeholder="Write content here"
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2 font-medium">Product category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="w-full px-3 py-2 border rounded text-sm bg-white"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div>
          <p className="mb-2 font-medium">Sub category</p>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value as any)}
            className="w-full px-3 py-2 border rounded text-sm bg-white"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2 font-medium">Product Price ($)</p>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full sm:w-[120px] px-3 py-2 border rounded text-sm bg-white"
            type="number"
            placeholder="25"
            required
            min={1}
          />
        </div>
      </div>

      <div>
        <p className="mb-2 font-medium">Product Sizes</p>
        <div className="flex gap-3">
          {availableSizes.map((item) => (
            <div
              key={item}
              onClick={() => handleSizeToggle(item)}
              className={cn(
                "px-3 py-1 cursor-pointer rounded border text-sm font-medium transition-colors",
                sizes.includes(item) ? "bg-pink-100 border-pink-400 text-pink-700" : "bg-slate-200 border-transparent text-gray-700"
              )}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-2 items-center">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={() => setBestseller((prev) => !prev)}
          className="cursor-pointer w-4 h-4 accent-black"
        />
        <label className="cursor-pointer text-sm" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      <button
        type="submit"
        className="w-28 py-3 mt-4 bg-black text-white text-sm font-medium hover:bg-gray-800 transition-colors rounded cursor-pointer"
      >
        ADD ITEM
      </button>
    </form>
  );
}
