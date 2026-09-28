import React from "react";
import Image from "next/image";
import { TopBanner } from "@/components/common/top-banner";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { SectionTitle } from "@/components/common/section-title";
import { NewsletterBox } from "@/components/home/newsletter-box";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-[#414141] flex flex-col">
      <TopBanner />

      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex-1">
        <Navbar />

        <div className="text-center text-2xl pt-10 border-t">
          <SectionTitle text1="CONTACT" text2="US" />
        </div>

        <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
          <Image
            className="w-full md:max-w-[480px] object-cover"
            src="/assets/hero_img.png"
            alt="Contact Shopverse"
            width={480}
            height={400}
          />
          <div className="flex flex-col justify-center items-start gap-6 text-gray-500 text-sm">
            <p className="font-semibold text-xl text-gray-600">Our Store</p>
            <p className="leading-relaxed">
              54709 Willms Station <br /> Suite 350, Washington, USA
            </p>
            <p>
              Tel: (415) 555-0132 <br /> Email: admin@shopverse.com
            </p>
            <p className="font-semibold text-xl text-gray-600">
              Careers at Shopverse
            </p>
            <p>Learn more about our teams and job openings.</p>
            <button
              type="button"
              className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500"
            >
              Explore Jobs
            </button>
          </div>
        </div>

        <NewsletterBox />
        <Footer />
      </div>
    </div>
  );
}
