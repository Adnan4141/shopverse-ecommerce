"use client";

import React, { useState } from "react";
import { useShop } from "@/context/shop-context";
import { products as defaultProducts } from "@/data/products";
import { toast } from "sonner";
import { Database, RefreshCw, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function AdminSeedPage() {
  const { setProducts, products } = useShop();
  const [loading, setLoading] = useState(false);
  const [lastSeeded, setLastSeeded] = useState<string | null>(null);

  const handleSeedData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/seed", { method: "POST" });
      const data = await res.json();

      if (data.success) {
        setProducts(defaultProducts);
        setLastSeeded(new Date().toLocaleTimeString());
        toast.success("Database & catalog seeded successfully with " + defaultProducts.length + " products!");
      } else {
        toast.error("Failed to seed data");
      }
    } catch {
      toast.error("Error executing seed script");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl bg-white p-8 rounded-2xl border border-gray-200 shadow-xs">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-pink-100 rounded-xl text-pink-700">
          <Database className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Super Admin Data Seeder</h1>
          <p className="text-xs text-gray-500">
            Initialize demo products, users, categories and default catalog state.
          </p>
        </div>
      </div>

      <hr className="my-6" />

      <div className="bg-gray-50 rounded-xl p-5 mb-6 border border-gray-100 space-y-3 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Current Catalog Size:</span>
          <span className="font-bold text-gray-900">{products.length} Products</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Default Super Admin:</span>
          <span className="font-mono text-xs bg-white px-2 py-1 rounded border">admin@shopverse.com</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-500">Seed Source:</span>
          <span className="text-xs font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded">
            Shopverse Official Catalog (15 products + images)
          </span>
        </div>
        {lastSeeded && (
          <div className="flex items-center gap-2 text-xs text-green-600 pt-2 border-t">
            <CheckCircle2 className="w-4 h-4" />
            <span>Last reset performed at: {lastSeeded}</span>
          </div>
        )}
      </div>

      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl mb-6 text-xs text-amber-800">
        <p className="font-semibold mb-1 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-amber-700" />
          Seed Operation Warning
        </p>
        This action restores all standard demo categories (Men, Women, Kids), sets up fresh stock prices, and resets deleted products to default factory settings.
      </div>

      <button
        type="button"
        onClick={handleSeedData}
        disabled={loading}
        className="w-full sm:w-auto px-6 py-3 bg-black hover:bg-gray-800 text-white rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
      >
        <RefreshCw className={"w-4 h-4 " + (loading ? "animate-spin" : "")} />
        <span>{loading ? "Seeding Database..." : "Execute Seed Data"}</span>
      </button>
    </div>
  );
}
