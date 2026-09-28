import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_key_shopverse", {
  apiVersion: "2025-02-24.acacia" as any,
});

export async function POST(request: Request) {
  try {
    const { amount, currency = "usd", orderData } = await request.json();

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid amount" },
        { status: 400 }
      );
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({
        success: true,
        isDemo: true,
        message: "Stripe Demo mode: simulated payment intent created",
        clientSecret: "pi_demo_mock_secret_" + Date.now(),
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      metadata: {
        orderId: orderData?.orderId || "ORD_" + Date.now(),
      },
    });

    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Payment intent creation failed" },
      { status: 500 }
    );
  }
}
