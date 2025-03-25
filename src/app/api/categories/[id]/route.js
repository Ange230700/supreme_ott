// src\app\api\categories\[id]\route.js

import { NextResponse } from "next/server";
import pool from "@/app/lib/db";

export async function GET(request, { params }) {
  const { id } = params;
  try {
    const [category] = await pool.query(
      "SELECT * FROM Categorie WHERE id = ?",
      [id]
    );
    if (!category.length) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(category[0]);
  } catch (error) {
    console.error("Error fetching category:", error);
    return NextResponse.json(
      { error: "Error fetching category" },
      { status: 500 }
    );
  }
}
