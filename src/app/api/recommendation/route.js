import { NextResponse } from "next/server";
import pool from "@/app/libs/pool";

// Save a new title
export async function POST(request) {
    try {
        const { title } = await request.json();
        if (!title) {
            return NextResponse.json({ error: "No title provided" }, { status: 400 });
        }
        const db = await pool.getConnection();
        const query = 'INSERT INTO recommendation(new_recommendation) VALUES (?)';
        await db.execute(query, [title]);
        db.release();
        return NextResponse.json({ message: "Title saved successfully" });
    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}
