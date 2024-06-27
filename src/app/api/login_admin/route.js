import { NextResponse } from "next/server";
import pool from "@/app/libs/pool";

export async function POST(request) {
    try {
        const { username, password, userType } = await request.json();

        if (userType !== 'admin') {
            return NextResponse.json({ error: 'Invalid user type' }, { status: 400 });
        }

        const db = await pool.getConnection();
        const query = 'SELECT admin_id, admin_password FROM administrative WHERE admin_id = ? AND admin_password = ?';
        const [rows] = await db.execute(query, [username, password]);
        db.release();

        if (rows.length === 0) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        return NextResponse.json({ message: 'Login successful', user: { admin_id: username } });
    } catch (error) {
        return NextResponse.json({
            error: error.message
        }, { status: 500 });
    }
}
