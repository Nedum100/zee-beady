import { Suspense } from 'react';
import Link from 'next/link';
import { SearchParamsWrapper } from '@/components/SearchParamsWrapper';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold mb-4">404 - Page Not Found</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchParamsWrapper>
          <div>
            <p>Could not find requested resource</p>
            <Link href="/" className="text-blue-500 hover:underline">
              Return Home
            </Link>
          </div>
        </SearchParamsWrapper>
      </Suspense>
    </div>
  );
}