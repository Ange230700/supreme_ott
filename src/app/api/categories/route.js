// src\app\api\categories\route.js

import { NextResponse } from "next/server";
import pool from "@/app/lib/db";

export async function GET() {
  try {
    const [categories] = await pool.query("SELECT * FROM Categorie");
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Error fetching categories" },
      { status: 500 }
    );
  }
}
