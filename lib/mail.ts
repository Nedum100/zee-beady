import nodemailer from 'nodemailer';

export async function sendResetEmail(email: string) {
  // Your email sending logic here
  const transporter = nodemailer.createTransport({
    // your transport config
  });
  
  // Send email logic
}
