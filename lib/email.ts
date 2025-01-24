import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface OrderDetails {
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  customerName?: string;
  customerEmail?: string;
}

export const sendOrderNotification = async (orderDetails: OrderDetails) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECEIVER_EMAIL,
    subject: 'New Order Placed on Zee Beady',
    html: `
      <h1>New Order Received!</h1>
      <div style="padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <h2>Order Details:</h2>
        <p><strong>Customer:</strong> ${orderDetails.customerName || 'Guest'}</p>
        <p><strong>Email:</strong> ${orderDetails.customerEmail || 'Not provided'}</p>
        <p><strong>Total Amount:</strong> ₦${orderDetails.total.toLocaleString()}</p>
        <h3>Items:</h3>
        <ul>
          ${orderDetails.items.map(item => `
            <li>${item.name} - Quantity: ${item.quantity} - ₦${item.price.toLocaleString()}</li>
          `).join('')}
        </ul>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Order notification email sent');
  } catch (error) {
    console.error('Error sending order notification:', error);
  }
};