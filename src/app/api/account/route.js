import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decrypt } from '@/app/lib'; 
import pool from '@/app/libs/pool';

export async function PUT(request) {
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

        // Get request body
        const requestBody = await request.json();
        console.log('Request Body:', requestBody); // Log request body for debugging
        const { studentName, newProgram, newInterests } = requestBody;

        // Validate input
        if (!studentName || !newProgram || !newInterests || !Array.isArray(newInterests) || newInterests.length === 0) {
            return NextResponse.json({ error: "Name, program, and at least one interest are required" }, { status: 400 });
        }

        // Connect to database
        db = await pool.getConnection();

        // Update user profile in the database
        const updateUserQuery = `UPDATE student 
                                 SET std_name = ?, std_program = ?, std_interest = ? 
                                 WHERE student_id = ?`;

        const updateParams = [studentName, newProgram, newInterests.join(', '), userData.matricNumber];
        
        await db.execute(updateUserQuery, updateParams);
        db.release();

        return NextResponse.json({ message: "User profile updated successfully" }, { status: 200 });
    } catch (error) {
        if (db) db.release();
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
