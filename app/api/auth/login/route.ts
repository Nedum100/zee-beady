import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  try {
    await connectDB();

    const { email, password } = await request.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Replace btoa() with jwt.sign()
       const token = jwt.sign(
        {
          userId: user._id,
          email: user.email,
          role: user.role,
          timestamp: Date.now(),
        },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
      );
      
    const cookieStore = cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });

    return NextResponse.json({
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}