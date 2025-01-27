// ClientAuthError.tsx (for /app/api/auth/error and /app/auth/error)

"use client";

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import React from "react"

const ClientAuthError = () => {
  const searchParams = useSearchParams();
  const error = searchParams?.get('error') || 'An error occurred';

  return (
    <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          Authentication Error
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {error === 'CredentialsSignin'
            ? 'Invalid email or password'
            : error}
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
  );
}
export default ClientAuthError;