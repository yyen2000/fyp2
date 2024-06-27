import { NextResponse } from 'next/server';
import pool from '@/app/libs/pool';
import crypto from 'crypto';

export async function POST(request) {
    try {
        const requestBody = await request.json();
        const { studentId, password, name, program, interests } = requestBody;

        if (!studentId || !password || !name || !program || !interests || interests.length === 0) {
            return NextResponse.json({ error: "Student ID, password, name, program, and at least one interest are required" }, { status: 400 });
        }

        if (!/^\d{5}$/.test(studentId)) {
            return NextResponse.json({ error: "Student ID must be a 5-digit number" }, { status: 400 });
        }

        const db = await pool.getConnection();
        const checkUserQuery = 'SELECT * FROM student WHERE student_id = ?';
        const [existingUser] = await db.execute(checkUserQuery, [studentId]);

        if (existingUser.length > 0) {
            db.release();
            return NextResponse.json({ error: "User already exists" }, { status: 409 });
        }

        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
        const insertUserQuery = 'INSERT INTO student (student_id, std_password, std_name, std_program, std_interest) VALUES (?, ?, ?, ?, ?)';
        await db.execute(insertUserQuery, [studentId, hashedPassword, name, program, interests.join(', ')]);
        db.release();

        return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
