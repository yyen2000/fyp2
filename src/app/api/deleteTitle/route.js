import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decrypt } from '@/app/lib';
import pool from '@/app/libs/pool';

export async function DELETE(request) {
    let db;
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    try {
        db = await pool.getConnection();

        const deleteQuery = 'DELETE FROM recommendation WHERE recommendation_id = ?';
        const [result] = await db.execute(deleteQuery, [id]);

        db.release();

        if (result.affectedRows === 0) {
            return NextResponse.json({ message: 'Title not found or you do not have permission to delete' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Title deleted successfully' }, { status: 200 });
    } catch (error) {
        if (db) db.release();
        return NextResponse.json({ message: error.toString() }, { status: 500 });
    }
}
