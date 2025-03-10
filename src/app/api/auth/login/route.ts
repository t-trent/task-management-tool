// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '@/app/lib/prisma';

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }
    
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    // Create an access token
    const accessToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    
    const response = NextResponse.json({ message: 'Login successful' });
    
    // Set HttpOnly cookie with the access token
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60, // 1 hour
      path: "/",
    });
    
    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
