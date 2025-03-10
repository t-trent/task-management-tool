// app/api/auth/logout/route.ts
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  // Create a response indicating logout success
  const response = NextResponse.json({ message: "Logged out successfully" });

  // Delete the access token cookie.
  response.cookies.delete("accessToken");

  return response;
}
