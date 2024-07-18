import { NextResponse } from "next/server";
import pool from "@/app/libs/pool";

export async function GET() {
    let db;
    try {
        db = await pool.getConnection();
        const query = 'SELECT past_fyp_topics FROM project_topic';
        const [rows] = await db.execute(query);
        db.release();
        return NextResponse.json(rows);
    } catch (error) {
        if (db) db.release();
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
