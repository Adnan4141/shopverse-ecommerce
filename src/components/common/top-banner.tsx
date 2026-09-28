import React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export const TopBanner = () => {
  const marqueeItems = [
    "🔥 SPECIAL OFFER: GET 20% OFF ON YOUR FIRST ORDER WITH CODE: SHOPVERSE20",
    "🚚 FREE SHIPPING WORLDWIDE ON ORDERS OVER $50",
    "⚡ NEW ARRIVALS JUST DROPPED - EXPLORE THE LATEST COLLECTION",
    "✨ 7 DAYS HASSLE-FREE RETURNS & EASY EXCHANGE GUARANTEED",
  ];

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-pink-700 via-pink-800 to-pink-700 text-white text-xs sm:text-sm overflow-hidden py-2 shadow-xs">
      <div className="flex overflow-hidden select-none">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
          {/* First sequence */}
          {marqueeItems.map((text, index) => (
            <div key={`item-1-${index}`} className="flex items-center gap-3">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
              <span className="font-medium tracking-wide">{text}</span>
              <span className="text-pink-300 font-bold">•</span>
            </div>
          ))}

          {/* Duplicated sequence for seamless continuous infinite scroll */}
          {marqueeItems.map((text, index) => (
            <div key={`item-2-${index}`} className="flex items-center gap-3">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300 shrink-0" />
              <span className="font-medium tracking-wide">{text}</span>
              <span className="text-pink-300 font-bold">•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
