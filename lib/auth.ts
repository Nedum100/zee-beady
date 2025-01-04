import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token');

  if (!token) {
    return null;
  }

    try {
        const { payload } = await jwtVerify(
            token.value,
            new TextEncoder().encode(JWT_SECRET)
        );
        return payload;
    } catch (error) {
        return null;
    }
}


export async function isAuthenticated() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')
    return !!token;
}