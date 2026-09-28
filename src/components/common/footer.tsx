import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="mt-20">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-20 text-sm">
        <div>
          <Image
            src="/assets/logo.png"
            className="mb-5 w-32 h-auto"
            alt="Forever Logo"
            width={128}
            height={39}
          />
          <p className="w-full md:w-2/3 text-gray-600 leading-relaxed text-xs sm:text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5 text-gray-800">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>
              <Link href="/" className="hover:text-black transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-black transition-colors"
              >
                About us
              </Link>
            </li>
            <li>
              <Link
                href="/delivery"
                className="hover:text-black transition-colors"
              >
                Delivery
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className="hover:text-black transition-colors"
              >
                Privacy policy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5 text-gray-800">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li className="hover:text-black transition-colors">
              <a href="tel:+12124567890">+1-212-456-7890</a>
            </li>
            <li className="hover:text-black transition-colors">
              <a href="mailto:contact@foreveryou.com">contact@foreveryou.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div>
        <hr className="border-gray-200" />
        <p className="py-5 text-xs sm:text-sm text-center text-gray-600">
          Copyright 2024@ forever.com - All Right Reserved.
        </p>
      </div>
    </footer>
  );
};
