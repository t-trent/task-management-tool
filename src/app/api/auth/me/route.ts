// app/api/auth/me/route.ts
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/app/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

export async function GET(request: NextRequest) {
  try {
    // Extract token from the HttpOnly cookie
    const token = request.cookies.get("accessToken")?.value;
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

    // Fetch the user by ID
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Return the fields you need
    return NextResponse.json({
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        birthday: user.birthday,
      },
    });
  } catch (error) {
    console.error("Error in /api/auth/me:", error);
    return NextResponse.json({ error: "Failed to fetch user data" }, { status: 500 });
  }
}
