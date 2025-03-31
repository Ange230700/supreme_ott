// src/app/api/auth/login/route.js

import { NextResponse } from "next/server";
import { pool } from "@/app/lib/db";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    // Query the database for the user
    const [rows] = await pool.query("SELECT * FROM User WHERE email = ?", [
      email,
    ]);
    const user = rows[0];

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 422 }
      );
    }

    const isValid = await argon2.verify(user.hashed_password, password);
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 422 }
      );
    }

    // Create JWT token
    const token = jwt.sign(
      { sub: user.id, email: user.email },
      process.env.APP_SECRET,
      {
        expiresIn: "1h",
      }
    );

    // Omit hashed_password before sending back
    const { hashed_password, ...userWithoutPassword } = user;

    return NextResponse.json({ token, user: userWithoutPassword });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
