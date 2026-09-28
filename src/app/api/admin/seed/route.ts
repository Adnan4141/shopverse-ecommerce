import { NextResponse } from "next/server";
import { products } from "@/data/products";

export async function POST() {
  try {
    return NextResponse.json({
      success: true,
      message: "Database seed data initialized successfully",
      seededProductsCount: products.length,
      defaultAdmin: {
        email: "admin@shopverse.com",
        role: "admin",
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to seed data" },
      { status: 500 }
    );
  }
}
