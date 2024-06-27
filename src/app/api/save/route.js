import { NextResponse } from 'next/server';
import pool from '@/app/libs/pool';


export async function GET(request) {
    try {
        const db = await pool.getConnection();
        const query = 'SELECT new_recommendation AS recommendation FROM recommendation';
        const [rows] = await db.execute(query);
        db.release();
        return NextResponse.json(rows);
    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}


     