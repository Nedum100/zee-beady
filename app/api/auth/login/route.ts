import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
    try {
        await connectDB();

        const { email, password } = await request.json();
         console.log('Login attempt with email:', email);


        const user = await User.findOne({ email });
         console.log('User found:', user);


        if (!user) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }
     
         console.log("Password to check:", password);
        const isPasswordValid = await user.comparePassword(password);
       console.log('isPasswordValid:',isPasswordValid);


        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Replace btoa() with jwt.sign()
        const token = jwt.sign(
            {
                userId: user._id.toString(), // Convert to string
                email: user.email,
                role: user.role,
                timestamp: Date.now(),
            },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' }
        );

        // AWAIT the result of the cookies function!
        const cookieStore = await cookies();
        cookieStore.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        });

        return NextResponse.json({
            user: {
                id: user._id.toString(), // Convert to string
                email: user.email,
                role: user.role,
                name: user.name,
            },
            token,
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}