"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const NewsletterBox = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail("");
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <section className="text-center my-12">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 rounded-none overflow-hidden"
      >
        <Input
          className="w-full sm:flex-1 border-0 shadow-none outline-none focus-visible:ring-0 focus-visible:border-0 rounded-none px-0 text-sm"
          placeholder="Enter your email"
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          type="submit"
          className="bg-black hover:bg-gray-800 text-white text-xs px-10 py-6 rounded-none font-medium transition-colors"
        >
          SUBSCRIBE
        </Button>
      </form>

      {subscribed && (
        <p className="text-xs text-green-600 font-medium">
          Thank you for subscribing! Your 20% discount code has been sent.
        </p>
      )}
    </section>
  );
};
