import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decrypt } from '@/app/lib'; 
import pool from '@/app/libs/pool';

export async function DELETE(request) {
    let db;
    try {
        // Obtain session cookie
        const sessionCookie = cookies().get('session');
        if (!sessionCookie) {
            return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
        }

        // Decrypt session cookie to get user data
        const { userData } = await decrypt(sessionCookie.value);
        if (!userData || !userData.matricNumber) {
            return NextResponse.json({ message: 'Invalid session' }, { status: 401 });
        }

        // Connect to database
        db = await pool.getConnection();

        // Delete user profile from the database
        const deleteUserQuery = `DELETE FROM student WHERE student_id = ?`;
        const deleteParams = [userData.matricNumber];

        await db.execute(deleteUserQuery, deleteParams);
        db.release();

        // Clear the session cookie
        const response = NextResponse.json({ message: "User profile deleted successfully" }, { status: 200 });
        response.cookies.set('session', '', { maxAge: -1, path: '/' });

        return response;
    } catch (error) {
        if (db) db.release();
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
