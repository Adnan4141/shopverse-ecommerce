import { NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const subCategory = searchParams.get("subCategory");
  const query = searchParams.get("search");

  let filtered = products;

  if (category) {
    filtered = filtered.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  }

  if (subCategory) {
    filtered = filtered.filter((p) => p.subCategory.toLowerCase() === subCategory.toLowerCase());
  }

  if (query) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  return NextResponse.json({
    success: true,
    count: filtered.length,
    products: filtered,
  });
}
