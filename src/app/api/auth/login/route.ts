import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Please enter email and password" },
        { status: 400 }
      );
    }

    // Check credentials (mocking admin & regular user)
    const isAdmin = email === "admin@shopverse.com" && password === "admin123";
    const token = "mock_jwt_token_" + Buffer.from(email).toString("base64") + "_" + Date.now();

    return NextResponse.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        name: isAdmin ? "Admin User" : email.split("@")[0],
        email,
        role: isAdmin ? "admin" : "customer",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Login failed" },
      { status: 500 }
    );
  }
}
