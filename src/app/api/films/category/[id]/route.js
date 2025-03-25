// src/app/api/films/category/[id]/route.js

import { NextResponse } from "next/server";
import pool from "@/app/lib/db";

export async function GET(request, context) {
  // Await the dynamic parameters before using them
  const { id } = await context.params;
  try {
    // Join Film and Categorie_par_film to get films for the specified category
    const [films] = await pool.query(
      `SELECT f.* 
       FROM Film f
       INNER JOIN Categorie_par_film cpf ON f.id = cpf.filmId
       WHERE cpf.categorieId = ?`,
      [id]
    );
    // Return an empty array if no films found (instead of a 404)
    return NextResponse.json(films);
  } catch (error) {
    console.error("Error fetching films for category:", error);
    return NextResponse.json(
      { error: "Error fetching films for category" },
      { status: 500 }
    );
  }
}
