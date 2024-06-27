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

    const fetchUserQuery = 'SELECT std_interest FROM student WHERE student_id = ?';
    const [user] = await db.execute(fetchUserQuery, [userData.matricNumber]);

    if (user.length === 0) {
      db.release();
      return NextResponse.json({ message: 'User does not exist' }, { status: 404 });
    }

    const dbUser = user[0];
    db.release();

    return NextResponse.json({  
      interests: dbUser.std_interest
    }, { status: 200 });
  } catch (error) {
    if (db) 
      db.release();
    return NextResponse.json({ message: error.toString() }, { status: 500 });
  }
}
