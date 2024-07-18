import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decrypt } from '@/app/lib';
import pool from '@/app/libs/pool';

export async function GET(request) {
    let db;
    try {
        const sessionCookie = cookies().get('session');
        if (!sessionCookie) {
            return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
        }

        const { userData } = await decrypt(sessionCookie.value);
        if (!userData || !userData.matricNumber) {
            return NextResponse.json({ message: 'Invalid session' }, { status: 401 });
        }

        db = await pool.getConnection();

        const fetchUserQuery = 'SELECT std_name, std_program, std_interest FROM student WHERE student_id = ?';
        const [user] = await db.execute(fetchUserQuery, [userData.matricNumber]);

        if (user.length === 0) {
            db.release();
            return NextResponse.json({ message: 'User does not exist' }, { status: 404 });
        }

        const fetchTitlesQuery = 'SELECT recommendation_id AS id, new_recommendation AS recommendation FROM recommendation WHERE student_id IS NOT NULL AND student_id = ?';
        const [titles] = await db.execute(fetchTitlesQuery, [userData.matricNumber]);

        db.release();

        return NextResponse.json(titles, { status: 200 });
    } catch (error) {
        if (db) db.release();
        return NextResponse.json({ message: error.toString() }, { status: 500 });
    }
}

export async function DELETE(request) {
    let db;
    try {
        const sessionCookie = cookies().get('session');
        if (!sessionCookie) {
            return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
        }

        const { userData } = await decrypt(sessionCookie.value);
        if (!userData || !userData.matricNumber) {
            return NextResponse.json({ message: 'Invalid session' }, { status: 401 });
        }

        const { id } = request.query; // Assuming the ID of the title to delete is passed in the query parameters

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
