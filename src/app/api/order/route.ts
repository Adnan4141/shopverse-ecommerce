import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, amount, address, paymentMethod } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Cart items cannot be empty" },
        { status: 400 }
      );
    }

    const orderId = "ORD_" + Date.now();

    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
      order: {
        orderId,
        items,
        amount,
        address,
        paymentMethod,
        date: new Date().toISOString(),
        status: "Order Placed",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
