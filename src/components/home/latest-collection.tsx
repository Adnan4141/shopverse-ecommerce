import React from "react";
import { products } from "@/data/products";
import { SectionTitle } from "@/components/common/section-title";
import { ProductItem } from "./product-item";

export const LatestCollection = () => {
  const latestProducts = products.slice(0, 10);

  return (
    <section className="my-10">
      <SectionTitle
        text1="LATEST"
        text2="COLLECTIONS"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the."
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts.map((item) => (
          <ProductItem key={item._id} product={item} />
        ))}
      </div>
    </section>
  );
};
