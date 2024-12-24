import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Contact from '@/models/Contact';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json();

    // Ensure the database is connected
    await connectDB();

    // Validate required fields
    const requiredFields = ['name', 'email', 'message'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Sanitize user input (basic sanitization example)
    const sanitizedBody = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      message: body.message.trim(),
    };

    // Save contact to the database
    const contact = await Contact.create(sanitizedBody);

    // Configure nodemailer to send an email notification
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Website Contact" <${process.env.EMAIL_USER}>`, // Sender
      to: process.env.RECEIVER_EMAIL, // Receiver
      subject: `New message from ${sanitizedBody.name}`, // Subject
      text: `You have a new message from your website:\n\nName: ${sanitizedBody.name}\nEmail: ${sanitizedBody.email}\nMessage: ${sanitizedBody.message}`, // Plain text
      html: `
        <h2>New  Form Submission</h2>
        <p><strong>Name:</strong> ${sanitizedBody.name}</p>
        <p><strong>Email:</strong> ${sanitizedBody.email}</p>
        <p><strong>Message:</strong> ${sanitizedBody.message}</p>
      `, // HTML content
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Return success response
    return NextResponse.json(
      { message: 'Message sent successfully', contact },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to send message:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}
