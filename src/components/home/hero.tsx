import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base tracking-wider">
              OUR BESTSELLERS
            </p>
          </div>
          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed text-[#414141]">
            Latest Arrivals
          </h1>
          <div className="flex items-center gap-2">
            <Link
              href="/collection"
              className="font-semibold text-sm md:text-base tracking-wider hover:opacity-75 transition-opacity"
            >
              SHOP NOW
            </Link>
            <p className="w-8 md:w-11 h-[1px] bg-[#414141]"></p>
          </div>
        </div>
      </div>

      <div className="w-full sm:w-1/2 relative bg-[#fbc6b7]">
        <Image
          src="/assets/hero_img.png"
          className="w-full h-auto object-cover"
          alt="Forever Latest Arrivals"
          width={700}
          height={500}
          priority
        />
      </div>
    </div>
  );
};
