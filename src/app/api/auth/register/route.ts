import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Please fill in all fields" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const token = "mock_jwt_token_" + Buffer.from(email).toString("base64") + "_" + Date.now();

    return NextResponse.json({
      success: true,
      message: "Account created successfully",
      token,
      user: {
        name,
        email,
        role: "customer",
      },
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Registration failed" },
      { status: 500 }
    );
  }
}
