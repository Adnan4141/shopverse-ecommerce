"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { TopBanner } from "@/components/common/top-banner";
import { Navbar } from "@/components/common/navbar";
import { Footer } from "@/components/common/footer";
import { useShop } from "@/context/shop-context";
import { toast } from "sonner";

export default function LoginPage() {
  const [currentState, setCurrentState] = useState<"Login" | "Sign Up">("Login");
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
      if (currentState === "Sign Up") {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();

        if (data.success) {
          loginUser(data.token, data.user);
          toast.success("Account created successfully!");
          router.push("/");
        } else {
          toast.error(data.message || "Registration failed");
        }
      } else {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();

        if (data.success) {
          loginUser(data.token, data.user);
          toast.success("Logged in successfully!");
          if (data.user.role === "admin") {
            router.push("/admin");
          } else {
            router.push("/");
          }
        } else {
          toast.error(data.message || "Invalid credentials");
        }
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#414141] flex flex-col">
      <TopBanner />

      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] flex-1">
        <Navbar />

        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
        >
          <div className="inline-flex items-center gap-2 mb-2 mt-10">
            <p className="prata-regular text-3xl">{currentState}</p>
            <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
          </div>

          {currentState === "Sign Up" && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-800 outline-none text-sm"
              placeholder="Name"
              required
            />
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-800 outline-none text-sm"
            placeholder="Email"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-800 outline-none text-sm"
            placeholder="Password"
            required
          />

          <div className="w-full flex justify-between text-sm mt-[-8px]">
            <p className="cursor-pointer text-xs text-gray-500 hover:text-black">
              Forgot your password?
            </p>
            {currentState === "Login" ? (
              <p
                onClick={() => setCurrentState("Sign Up")}
                className="cursor-pointer text-xs font-medium hover:underline"
              >
                Create account
              </p>
            ) : (
              <p
                onClick={() => setCurrentState("Login")}
                className="cursor-pointer text-xs font-medium hover:underline"
              >
                Login Here
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white font-light px-8 py-2.5 mt-4 text-sm hover:bg-gray-800 transition-colors cursor-pointer w-full"
          >
            {loading ? "Please wait..." : currentState === "Login" ? "Sign In" : "Sign Up"}
          </button>

          {currentState === "Login" && (
            <div className="mt-4 p-3 bg-gray-50 border text-xs text-gray-500 w-full text-center">
              <p className="font-semibold text-gray-700">Admin Demo Login:</p>
              <p>Email: <span className="text-black font-mono">admin@shopverse.com</span></p>
              <p>Password: <span className="text-black font-mono">admin123</span></p>
            </div>
          )}
        </form>

        <Footer />
      </div>
    </div>
  );
}
