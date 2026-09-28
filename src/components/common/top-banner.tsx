import Link from "next/link";
import React from "react";

export const TopBanner = () => {
  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-pink-700 via-pink-800 to-pink-700 text-white text-xs sm:text-sm overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium">
            This is a sample UI platform designed exclusively for testing and prototyping.
          </span>
          <Link
            href="http://greatstack.dev/go/forever"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-200 underline whitespace-nowrap"
          >
            Get Source Code
          </Link>
        </div>
      </div>
    </div>
  );
};
