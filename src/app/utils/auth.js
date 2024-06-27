import { decrypt } from '../lib'; 

export async function getUserFromSession(request) {
  const sessionCookie = request.cookies.get('session');
  if (!sessionCookie) {
    throw new Error('Unauthorized');
  }
  const sessionData = await decrypt(sessionCookie);
  return sessionData.userData;
}
