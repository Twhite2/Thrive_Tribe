import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcrypt';

// In a Vercel serverless environment, in-memory storage doesn't persist between function calls
// This is only for demo purposes - in production, use a real database
// We'll simulate success for the demo but note this won't actually store users

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

    // In a real app, you would check if the user exists in the database
    // For demo purposes, we'll assume the user doesn't exist
    // If this was a production app with a real database, you'd do something like:
    // const existingUser = await db.users.findOne({ email });
    // if (existingUser) { return error response... }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // In a real app, save to database
    // For demo, just store in memory
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
      isPremium: false
    };

    // In a real app: await db.users.insert(newUser);
    // For the demo, we don't need to store anything since this is serverless

    // Return success but exclude password
    const { password: _, ...userWithoutPassword } = newUser;
    
    return NextResponse.json(
      { message: "User registered successfully", user: userWithoutPassword },
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
