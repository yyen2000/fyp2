import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { encrypt } from '@/app/lib';
import pool from '@/app/libs/pool';
import crypto from 'crypto';

export async function POST(request) {
  let db;
  try {
    const { matricNumber, password } = await request.json();

    if (!matricNumber || !password) {
      return NextResponse.json({ message: 'Matric number and password are required' }, { status: 400 });
    }

    if (!/^\d{5}$/.test(matricNumber)) {
      return NextResponse.json({ message: 'Matric number must be a 5-digit number' }, { status: 400 });
    }

    db = await pool.getConnection();

    const fetchUserQuery = 'SELECT * FROM student WHERE student_id = ?';
    const [user] = await db.execute(fetchUserQuery, [matricNumber]);

    if (user.length === 0) {
      db.release();
      return NextResponse.json({ message: 'User does not exist' }, { status: 404 });
    }

    const dbUser = user[0];
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

    if (dbUser.std_password !== hashedPassword) {
      db.release();
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    // Fetch user interests
    const fetchInterestsQuery = 'SELECT std_interest FROM student WHERE student_id = ?';
    const [interests] = await db.execute(fetchInterestsQuery, [matricNumber]);
    const userInterests = interests.map(interest => interest.std_interest); // Assuming the column name is std_interest

    db.release();

    const userData = {
      matricNumber: matricNumber,
      studentName: dbUser.std_name,
      interests: userInterests
    };
    const expires = new Date(Date.now() + 86400 * 1000); // 1 day expiration
    const session = await encrypt({ userData, expires });
    cookies().set('session', session, { expires, httpOnly: true });

    return NextResponse.json({ message: 'Login successful', studentName: dbUser.std_name, interests: userInterests }, { status: 200 });
  } catch (error) {
    if (db) 
      db.release();
    return NextResponse.json({ message: error.toString() }, { status: 500 });
  }
}
