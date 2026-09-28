import React from "react";
import { TopBanner } from "@/components/common/top-banner";
import { Navbar } from "@/components/common/navbar";
import { Hero } from "@/components/home/hero";
import { LatestCollection } from "@/components/home/latest-collection";
import { BestSellers } from "@/components/home/best-sellers";
import { OurPolicy } from "@/components/home/our-policy";
import { NewsletterBox } from "@/components/home/newsletter-box";
import { Footer } from "@/components/common/footer";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-white text-[#414141] flex flex-col">
      <TopBanner />

      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex-1">
        <Navbar />
        <Hero />
        <LatestCollection />
        <BestSellers />
        <OurPolicy />
        <NewsletterBox />
        <Footer />
      </div>
    </div>
  );
}
