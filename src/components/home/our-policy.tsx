import React from "react";
import Image from "next/image";

export const OurPolicy = () => {
  return (
    <section className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div>
        <Image
          src="/assets/exchange_icon.png"
          className="w-12 h-auto m-auto mb-5"
          alt="Easy Exchange Policy"
          width={48}
          height={48}
        />
        <p className="font-semibold text-gray-800">Easy Exchange Policy</p>
        <p className="text-gray-400 mt-1">We offer hassle free exchange policy</p>
      </div>

      <div>
        <Image
          src="/assets/quality_icon.png"
          className="w-12 h-auto m-auto mb-5"
          alt="7 Days Return Policy"
          width={48}
          height={48}
        />
        <p className="font-semibold text-gray-800">7 Days Return Policy</p>
        <p className="text-gray-400 mt-1">We provide 7 days free return policy</p>
      </div>

      <div>
        <Image
          src="/assets/support_icon.png"
          className="w-12 h-auto m-auto mb-5"
          alt="Best Customer Support"
          width={48}
          height={48}
        />
        <p className="font-semibold text-gray-800">Best customer support</p>
        <p className="text-gray-400 mt-1">we provide 24/7 customer support</p>
      </div>
    </section>
  );
};
