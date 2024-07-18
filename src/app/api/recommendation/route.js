import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib";
import pool from "@/app/libs/pool";

// Save a new title
export async function POST(request) {
    let db;
    try {
        const { title } = await request.json();
        if (!title) {
            return NextResponse.json({ error: "No title provided" }, { status: 400 });
        }

        const sessionCookie = cookies().get('session');
        if (!sessionCookie) {
            return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
        }

        const { userData } = await decrypt(sessionCookie.value);
        if (!userData || !userData.matricNumber) {
            return NextResponse.json({ message: 'Invalid session' }, { status: 401 });
        }

        db = await pool.getConnection();

        const fetchUserQuery = 'SELECT student_id FROM student WHERE student_id = ?';
        const [user] = await db.execute(fetchUserQuery, [userData.matricNumber]);

        if (user.length === 0) {
            db.release();
            return NextResponse.json({ message: 'User does not exist' }, { status: 404 });
        }

        const studentId = user[0].student_id;

        const insertQuery = 'INSERT INTO recommendation(student_id, new_recommendation) VALUES (?, ?)';
        await db.execute(insertQuery, [studentId, title]);

        db.release();
        return NextResponse.json({ message: "Title saved successfully" });
    } catch (error) {
        if (db) db.release();
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}
