// app/api/auth/refresh/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/app/lib/prisma";

const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET || "your_access_secret";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "your_refresh_secret";

export async function POST(request: Request) {
  try {
    // If using cookies, get refresh token from cookie:
    const refreshToken = request.headers.get("Cookie")?.split("refreshToken=")[1];
    // Alternatively, you can accept it in the body:
    // const { refreshToken } = await request.json();

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token missing" },
        { status: 401 }
      );
    }

    // Verify refresh token
    const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as { userId: number };

    // Issue a new access token (expires in 1 hour)
    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      JWT_ACCESS_SECRET,
      { expiresIn: "1h" }
    );

    // Optionally, issue a new refresh token if desired:
    const newRefreshToken = jwt.sign(
      { userId: decoded.userId },
      JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // Send the new access token (and new refresh token via HttpOnly cookie)
    const response = NextResponse.json({ accessToken: newAccessToken });

    // Set refresh token cookie (HttpOnly, Secure, etc.)
    response.cookies.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Refresh token error:", error);
    return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 });
  }
}
