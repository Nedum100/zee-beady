'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Authentication Error
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {error === 'CredentialsSignin' 
              ? 'Invalid email or password'
              : 'An error occurred during authentication'}
          </p>
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/login"
            className="text-blue-600 hover:text-blue-500 font-medium"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
} 