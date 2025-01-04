import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/lib/auth/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import Navigation from '@/components/layout/Navigation';
// import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { NextAuthProvider } from '@/providers/NextAuthProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'zee_beady',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ErrorBoundary>
          <NextAuthProvider>
            <AuthProvider>
              <Navigation /> {/* Use your custom Navbar here */}
              <main className="min-h-screen">{children}</main>
              <Toaster />
              <Footer />
            </AuthProvider>
          </NextAuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}