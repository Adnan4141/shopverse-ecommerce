import type { Metadata } from "next";
import { Outfit, Prata } from "next/font/google";
import "./globals.css";
import { ShopContextProvider } from "@/context/shop-context";
import { Toaster } from "sonner";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
});

const prata = Prata({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-prata",
});

export const metadata: Metadata = {
  title: "Forever - E-commerce Store",
  description: "Forever Clothing & Fashion Storefront",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={}>
      <body className="font-sans antialiased text-[#414141] bg-white min-h-screen flex flex-col">
        <ShopContextProvider>
          <Toaster position="top-right" richColors />
          {children}
        </ShopContextProvider>
      </body>
    </html>
  );
}
