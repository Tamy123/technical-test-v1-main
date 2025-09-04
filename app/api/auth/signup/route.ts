import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import { UserModel } from "@/lib/models";
import bcrypt from "bcrypt";
import { setAuthCookie } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Username, email, and password are required" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Check if username or email already exists
    const existingUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Username or email already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = new UserModel({
      username,
      email,
      passwordHash,
    });

    await newUser.save();

    // Create user response object
    const userResponse = {
      id: newUser._id.toString(),
      username: newUser.username,
      email: newUser.email,
      avatar: newUser.avatar || "",
      karma: newUser.karma || 0,
    };

    // Set authentication cookie to automatically log in the user
    await setAuthCookie(userResponse);

    // Return success response
    return NextResponse.json({
      message: "User created successfully",
      user: userResponse,
    });
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
