// app/api/tasks/route.ts
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/app/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

export async function GET(request: NextRequest) {
  try {
    // Extract token from HttpOnly cookie
    const token = request.cookies.get("accessToken")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }
    
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

    // Fetch tasks for the authenticated user.
    const tasks = await prisma.task.findMany({
      where: { userId: decoded.userId },
    });

    return NextResponse.json({ tasks: tasks || [] });
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return NextResponse.json(
        { error: "Token expired, please log in again" },
        { status: 401 }
      );
    }
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Extract token from cookie
    const token = request.cookies.get("accessToken")?.value;
    if (!token) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }
    
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

    // Parse the request body
    const { title, description } = await request.json();
    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    // Create the task with a default status of "pending"
    const newTask = await prisma.task.create({
      data: {
        title,
        description: description || null,
        status: "pending",
        userId: decoded.userId,
      },
    });

    return NextResponse.json(
      { message: "Task created successfully", task: newTask },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}
