// app/api/auth/update/route.ts
import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/app/lib/prisma";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

export async function PUT(request: NextRequest) {
  try {
    // Extract the token from the cookie named "accessToken"
    const token = request.cookies.get("accessToken")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

    const { firstName, lastName, birthday } = await request.json();

    const updatedUser = await prisma.user.update({
      where: { id: decoded.userId },
      data: {
        firstName,
        lastName,
        birthday: birthday ? new Date(birthday) : null,
      },
    });

    return NextResponse.json({ message: "User updated", user: updatedUser });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { error: "Failed to update user data" },
      { status: 500 }
    );
  }
}
