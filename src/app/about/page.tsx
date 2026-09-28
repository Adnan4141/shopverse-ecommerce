import React from "react";
import Image from "next/image";
import { TopBanner } from "@/components/common/top-banner";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { SectionTitle } from "@/components/common/section-title";
import { NewsletterBox } from "@/components/home/newsletter-box";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-[#414141] flex flex-col">
      <TopBanner />

      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex-1">
        <Navbar />

        <div className="text-2xl text-center pt-8 border-t">
          <SectionTitle text1="ABOUT" text2="US" />
        </div>

        <div className="my-10 flex flex-col md:flex-row gap-16 items-center">
          <Image
            className="w-full md:max-w-[450px] object-cover"
            src="/assets/hero_img.png"
            alt="About Shopverse"
            width={450}
            height={450}
          />
          <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600 text-sm leading-relaxed">
            <p>
              Shopverse was born out of a passion for innovation and a desire to
              revolutionize the way people shop online. Our journey began with a
              simple idea: to provide a platform where customers can easily
              discover, explore, and purchase a wide range of products from the
              comfort of their homes.
            </p>
            <p>
              Since our inception, we&apos;ve worked tirelessly to curate a diverse
              selection of high-quality products that cater to every taste and
              preference. From fashion and beauty to electronics and home
              essentials, we offer an extensive collection sourced from trusted
              brands and suppliers.
            </p>
            <b className="text-gray-800">Our Mission</b>
            <p>
              Our mission at Shopverse is to empower customers with choice,
              convenience, and confidence. We&apos;re dedicated to providing a seamless
              shopping experience that exceeds expectations, from browsing and
              ordering to delivery and beyond.
            </p>
          </div>
        </div>

        <div className="text-xl py-4">
          <SectionTitle text1="WHY" text2="CHOOSE US" className="text-left" />
        </div>

        <div className="flex flex-col md:flex-row text-sm mb-20">
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Quality Assurance:</b>
            <p className="text-gray-600">
              We meticulously select and vet each product to ensure it meets our
              stringent quality standards.
            </p>
          </div>
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Convenience:</b>
            <p className="text-gray-600">
              With our user-friendly interface and hassle-free ordering process,
              shopping has never been easier.
            </p>
          </div>
          <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b>Exceptional Customer Service:</b>
            <p className="text-gray-600">
              Our team of dedicated professionals is here to assist you the way,
              ensuring your satisfaction is our top priority.
            </p>
          </div>
        </div>

        <NewsletterBox />
        <Footer />
      </div>
    </div>
  );
}
