// app/api/auth/validate/route.ts
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

export async function GET(request: NextRequest) {
  // Access cookies via request.cookies
  // Validate the access token
  const token = request.cookies.get("accessToken")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return NextResponse.json({ message: "Valid token" });
  } catch (error) {
    console.error("Token validation error:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
