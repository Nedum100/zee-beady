'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useAuthRedirect } from '@/lib/auth/useAuthRedirect';
import { LoadingScreen } from '@/components/layout/LoadingScreen';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { UserPlus, Loader } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { isLoading: isAuthLoading } = useAuthRedirect(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    const name = formData.get('name') as string;

    try {
      if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Sign up the user
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create account');
      }

      // After successful signup, sign in the user
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        throw new Error(result.error);
      }

      toast({
        title: 'Success',
        description: 'Account created successfully',
      });

      router.push('/dashboard');
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to create account',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-white px-4 py-12">
      <Card className="max-w-lg w-full p-10 shadow-xl border border-gray-200 bg-white rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-blue-700">Create Your Account</h2>
          <p className="text-gray-500 mt-2">Join our community and explore!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Input
              name="name"
              type="text"
              required
              placeholder="Full Name"
              className="focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <Input
              name="email"
              type="email"
              required
              placeholder="Email address"
              className="focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <Input
              name="password"
              type="password"
              required
              placeholder="Password"
              className="focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <Input
              name="confirmPassword"
              type="password"
              required
              placeholder="Confirm Password"
              className="focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" /> Sign Up
              </>
            )}
          </Button>

          <p className="text-center text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 hover:text-blue-500">
              Sign in
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
}
