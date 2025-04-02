// src\app\api\users\route.js

import { NextResponse } from "next/server";
import pool from "@/app/lib/db";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    const { name, email, naissance, civility, password, avatarId } =
      await request.json();

    // Validate required fields
    if (!name || !email || !password || !avatarId || !naissance) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if a user with the same email already exists
    const [existingUsers] = await pool.query(
      "SELECT * FROM User WHERE email = ?",
      [email]
    );
    if (existingUsers && existingUsers.length > 0) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await argon2.hash(password);

    // Insert the new user into the database
    const [result] = await pool.query(
      `INSERT INTO User (name, email, naissance, civility, hashed_password, avatarId)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, email, naissance, civility, hashedPassword, avatarId]
    );
    const createdId = result.insertId;

    // Retrieve the newly created user along with avatar details
    const [rows] = await pool.query(
      `SELECT U.id, U.name, U.email, U.naissance, U.civility, U.IsAdmin, U.avatarId,
              A.avatar_url, A.avatar_filename
       FROM User U
       JOIN Avatar A ON U.avatarId = A.id
       WHERE U.id = ?`,
      [createdId]
    );
    const newUser = rows[0];

    // Create a JWT token for the new user
    const token = jwt.sign(
      { sub: newUser.id, email: newUser.email },
      process.env.APP_SECRET,
      { expiresIn: "1h" }
    );

    return NextResponse.json(
      { token, newUserWithoutPassword: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
