import { NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Create the JWT token
    const token = sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" }
    );

    // Use NextResponse to set the cookie
    const response = NextResponse.json({
      message: "Login successful",
      user: { id: user._id, email: user.email, name: user.name, role: user.role },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error: any) {
    console.error("Error in /api/auth/login:", error.message);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
