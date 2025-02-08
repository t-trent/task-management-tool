// app/api/tasks/route.ts
import { NextResponse } from "next/server";
import prisma from "../../lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

export async function GET(request: Request) {
    try {
      const authHeader = request.headers.get("Authorization");
      if (!authHeader) {
        return NextResponse.json(
          { error: "Authorization header missing" },
          { status: 401 }
        );
      }
      
      const token = authHeader.replace("Bearer ", "");
      // Verify the token; this may throw a TokenExpiredError if expired.
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };
  
      // Fetch tasks for the authenticated user.
      const tasks = await prisma.task.findMany({
        where: { userId: decoded.userId },
      });
  
      return NextResponse.json({ tasks: tasks || [] });
    } catch (error: any) {
      // Check if the error is due to token expiration.
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

export async function POST(request: Request) {
  try {
    // Verify Authorization header exists
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return NextResponse.json(
        { error: "Authorization header missing" },
        { status: 401 }
      );
    }
    
    // Extract and verify token
    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: number };

    // Parse the request body
    const { title, description } = await request.json();
    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    // Create the task with a default status
    const newTask = await prisma.task.create({
      data: {
        title,
        description: description || null,
        status: "pending", // default status
        userId: decoded.userId, // associate with authenticated user
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
