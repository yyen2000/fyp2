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
    const [userRows] = await db.execute(fetchUserQuery, [userData.matricNumber]);

    if (userRows.length === 0) {
      db.release();
      return NextResponse.json({ message: 'User does not exist' }, { status: 404 });
    }

    const user = userRows[0]; // Ensure we're accessing the first result

    const fetchTitlesQuery = 'SELECT recommendation_id AS id, new_recommendation AS recommendation FROM recommendation WHERE student_id = ?';
    const [titles] = await db.execute(fetchTitlesQuery, [userData.matricNumber]);

    db.release();

    return NextResponse.json({
      studentName: user.std_name,
      program: user.std_program,
      interests: user.std_interest.split(','),
      titles
    }, { status: 200 });

  } catch (error) {
    if (db) db.release();
    return NextResponse.json({ message: error.toString() }, { status: 500 });
  }
}
