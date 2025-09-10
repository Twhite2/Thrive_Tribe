import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/lib/db/repositories/userRepository';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    // Create user in database
    const newUser = await createUser({ name, email, password });

    if (!newUser) {
      return NextResponse.json(
        { message: "User already exists with this email" },
        { status: 409 }
      );
    }

    // Return success with user data
    return NextResponse.json(
      { message: "User registered successfully", user: newUser },
      { status: 201 }
    );
    
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Error processing registration" },
      { status: 500 }
    );
  }
}
