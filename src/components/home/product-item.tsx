import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@/data/products";

interface ProductItemProps {
  product: Product;
  currency?: string;
}

export const ProductItem: React.FC<ProductItemProps> = ({
  product,
  currency = "$",
}) => {
  return (
    <Link
      href={"/product/" + product._id}
      className="text-gray-700 cursor-pointer group block"
    >
      <div className="overflow-hidden bg-gray-50 aspect-square relative">
        <Image
          src={product.image[0]}
          alt={product.name}
          width={400}
          height={400}
          className="hover:scale-110 transition ease-in-out duration-300 w-full h-full object-cover"
        />
      </div>
      <p className="pt-3 pb-1 text-sm line-clamp-1 group-hover:text-black transition-colors">
        {product.name}
      </p>
      <p className="text-sm font-medium text-gray-900">
        {currency}
        {product.price}
      </p>
    </Link>
  );
};
