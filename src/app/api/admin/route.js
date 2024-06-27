import { NextResponse } from 'next/server';
import pool from '@/app/libs/pool';

export async function POST(req) {
    const { id, title, year } = await req.json();

    if (!title || !year) {
        return NextResponse.json({ error: 'Title and year are required' }, { status: 400 });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO project_topic (past_topics_id, past_fyp_topics, past_fyp_year) VALUES (?, ?, ?)',
            [id, title, year]
        );

        return NextResponse.json({ id: result.insertId, title, year }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
