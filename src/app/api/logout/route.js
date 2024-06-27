import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    cookies().set('session', '', { expires: new Date(0) });
    return NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.toString() }, { status: 500 });
  }
}
