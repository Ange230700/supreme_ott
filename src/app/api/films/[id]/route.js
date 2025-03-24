// src\app\api\films\[id]\route.js

import { NextResponse } from "next/server";
import pool from "@/app/lib/db";

// GET: Retrieve a film by its ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const [rows] = await pool.query("SELECT * FROM Film WHERE id = ?", [id]);
    if (!rows.length) {
      return NextResponse.json({ error: "Film not found" }, { status: 404 });
    }
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching film" }, { status: 500 });
  }
}

// PUT: Update a film by its ID
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const {
      miniature_url,
      cover_url,
      title,
      videoUrl,
      duration,
      year,
      description,
      IsAvailable,
    } = await request.json();

    const [result] = await pool.query(
      `UPDATE Film SET 
         miniature_url = ?,
         cover_url = ?,
         title = ?,
         videoUrl = ?,
         duration = ?,
         year = ?,
         description = ?,
         IsAvailable = ?
       WHERE id = ?`,
      [
        miniature_url,
        cover_url,
        title,
        videoUrl,
        duration,
        year,
        description,
        IsAvailable,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Film not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Film updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error updating film" }, { status: 500 });
  }
}

// DELETE: Delete a film by its ID
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const [result] = await pool.query("DELETE FROM Film WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Film not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Film deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error deleting film" }, { status: 500 });
  }
}
