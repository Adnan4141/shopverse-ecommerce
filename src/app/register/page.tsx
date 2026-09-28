"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TopBanner } from "@/components/common/top-banner";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { useShop } from "@/context/shop-context";
import { toast } from "sonner";
import { User, Mail, Lock } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { loginUser } = useShop();
  const router = useRouter();

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (data.success) {
        loginUser(data.token, data.user);
        toast.success("Welcome to Shopverse! Account created successfully.");
        router.push("/");
      } else {
        toast.error(data.message || "Registration failed");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#414141] flex flex-col">
      <TopBanner />

      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex-1">
        <Navbar />

        <div className="max-w-md mx-auto my-14 p-8 border border-gray-200 rounded-2xl shadow-sm bg-white">
          <div className="text-center mb-8">
            <h1 className="prata-regular text-3xl text-gray-900 mb-2">Create Account</h1>
            <p className="text-xs text-gray-500">
              Join Shopverse today for exclusive collections and instant rewards.
            </p>
          </div>

          <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                Full Name
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2.5 bg-gray-50/50 focus-within:border-black focus-within:bg-white transition-all">
                <User className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none text-gray-800"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                Email Address
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2.5 bg-gray-50/50 focus-within:border-black focus-within:bg-white transition-all">
                <Mail className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none text-gray-800"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2.5 bg-gray-50/50 focus-within:border-black focus-within:bg-white transition-all">
                <Lock className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none text-gray-800"
                  placeholder="Minimum 6 characters"
                  required
                  minLength={6}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer mt-2 disabled:opacity-70 shadow-sm"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <div className="text-center text-xs text-gray-500 mt-2">
              Already have an account?{" "}
              <Link href="/login" className="text-black font-semibold hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </div>

        <Footer />
      </div>
    </div>
  );
}
