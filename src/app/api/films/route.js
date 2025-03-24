// src/app/api/films/route.js

import { NextResponse } from "next/server";
import pool from "@/app/lib/db";

// GET: List all films
export async function GET() {
  try {
    const [films] = await pool.query("SELECT * FROM Film");
    return NextResponse.json(films);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error fetching films" },
      { status: 500 }
    );
  }
}

// POST: Add a new film
export async function POST(request) {
  try {
    const {
      miniature_url,
      cover_url,
      title,
      videoUrl,
      duration,
      year,
      description,
      IsAvailable,
      category, // Expected as JSON string representing categories
    } = await request.json();

    // Insert film record using URL fields only
    const [result] = await pool.query(
      `INSERT INTO Film (miniature_url, cover_url, title, videoUrl, duration, year, description, IsAvailable)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        miniature_url,
        cover_url,
        title,
        videoUrl,
        duration,
        year,
        description,
        IsAvailable,
      ]
    );

    const filmId = result.insertId;

    // If category data is provided, add join table entries
    if (category) {
      const categories = JSON.parse(category);
      const queries = categories.map((cat) => {
        const unique_key = `${filmId}-${cat.id}`;
        return pool.query(
          `INSERT INTO Categorie_par_film (filmId, categorieId, unique_key)
           VALUES (?, ?, ?)`,
          [filmId, cat.id, unique_key]
        );
      });
      await Promise.all(queries);
    }

    return NextResponse.json({ filmId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error adding film" }, { status: 500 });
  }
}
