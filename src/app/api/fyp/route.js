import { NextResponse } from "next/server";
import pool from "@/app/libs/pool";

export async function GET() {
    try {
        const db = await pool.getConnection();
        const query = 'select * from project_topic';
        const [rows] = await db.execute(query);
        db.release();
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}

export async function DELETE(request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    try {
        const db = await pool.getConnection();
        const query = 'DELETE FROM project_topic WHERE past_topics_id = ?';
        const [result] = await db.execute(query, [id]);
        db.release();

        if (result.affectedRows === 0) {
            return NextResponse.json({ error: 'Record not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Record deleted successfully' });
    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}
