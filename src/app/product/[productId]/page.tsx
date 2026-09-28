"use client";

import React, { use, useState } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { TopBanner } from "@/components/common/top-banner";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { SectionTitle } from "@/components/common/section-title";
import { ProductItem } from "@/components/home/product-item";
import { useShop } from "@/context/shop-context";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  const { productId } = use(params);
  const { products, currency, addToCart } = useShop();

  const productData = products.find((item) => item._id === productId);

  const [image, setImage] = useState(
    productData?.image[0] || "/products/p_img17.png"
  );
  const [size, setSize] = useState("");

  if (!productData) {
    notFound();
  }

  const relatedProducts = products
    .filter(
      (item) =>
        item.category === productData.category &&
        item.subCategory === productData.subCategory &&
        item._id !== productData._id
    )
    .slice(0, 5);

  return (
    <div className="min-h-screen bg-white text-[#414141] flex flex-col">
      <TopBanner />

      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex-1">
        <Navbar />

        <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
          <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
            <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
              <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full gap-2">
                {productData.image.map((item, index) => (
                  <div
                    key={index}
                    onClick={() => setImage(item)}
                    className="cursor-pointer border hover:border-black shrink-0 w-[24%] sm:w-full aspect-square relative"
                  >
                    <Image
                      src={item}
                      alt={productData.name}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="w-full sm:w-[80%] aspect-square relative bg-gray-50">
                <Image
                  src={image}
                  className="w-full h-full object-cover"
                  alt={productData.name}
                  width={600}
                  height={600}
                  priority
                />
              </div>
            </div>

            <div className="flex-1">
              <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
              <div className="flex items-center gap-1 mt-2">
                {[...Array(4)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-orange-500 text-orange-500"
                  />
                ))}
                <Star className="w-4 h-4 text-orange-300" />
                <p className="pl-2 text-sm text-gray-500">(122)</p>
              </div>
              <p className="mt-5 text-3xl font-medium">
                {currency}
                {productData.price}
              </p>
              <p className="mt-5 text-gray-500 md:w-4/5 leading-relaxed text-sm">
                {productData.description}
              </p>

              <div className="flex flex-col gap-4 my-8">
                <p className="font-medium">Select Size</p>
                <div className="flex gap-2">
                  {productData.sizes.map((item, index) => (
                    <button
                      type="button"
                      onClick={() => setSize(item)}
                      className={cn(
                        "border py-2 px-4 bg-gray-100 cursor-pointer font-medium text-sm transition-all",
                        item === size ? "border-orange-500 bg-orange-50" : ""
                      )}
                      key={index}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => addToCart(productData._id, size)}
                className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer hover:bg-gray-900 transition-colors"
              >
                ADD TO CART
              </button>

              <hr className="mt-8 sm:w-4/5" />
              <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                <p>100% Original product.</p>
                <p>Cash on delivery is available on this product.</p>
                <p>Easy return and exchange policy within 7 days.</p>
              </div>
            </div>
          </div>

          <div className="mt-20">
            <div className="flex">
              <b className="border px-5 py-3 text-sm">Description</b>
              <p className="border px-5 py-3 text-sm text-gray-500">
                Reviews (122)
              </p>
            </div>
            <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
              <p>
                An e-commerce website is an online platform that facilitates the
                buying and selling of products or services over the internet. It
                serves as a virtual marketplace where businesses and individuals
                can showcase their products, interact with customers, and
                conduct transactions without the need for a physical presence.
              </p>
              <p>
                E-commerce websites typically display products or services along
                with detailed descriptions, images, prices, and any available
                variations (e.g., sizes, colors). Each product usually has its
                own dedicated page with relevant information.
              </p>
            </div>
          </div>

          {relatedProducts.length > 0 && (
            <div className="my-24">
              <SectionTitle text1="RELATED" text2="PRODUCTS" />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
                {relatedProducts.map((item) => (
                  <ProductItem key={item._id} product={item} />
                ))}
              </div>
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
}
