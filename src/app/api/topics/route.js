import { NextResponse } from "next/server";
import pool from "@/app/libs/pool";

export async function GET(request) {
    try {
        const db = await pool.getConnection();
        
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const pageSize = parseInt(searchParams.get('pageSize')) || 20;
        const offset = (page - 1) * pageSize;
        
        const query = 'SELECT * FROM past_fyp_topics LIMIT ? OFFSET ?';
        const [rows] = await db.execute(query, [pageSize, offset]);
        db.release();
        
        // Fetch total count for pagination
        const countQuery = 'SELECT COUNT(*) as count FROM past_fyp_topics';
        const [countResult] = await db.execute(countQuery);
        const total = countResult[0].count;
        
        return NextResponse.json({ titles: rows, total });
    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}
