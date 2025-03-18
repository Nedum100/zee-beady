'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

export function SearchParamsWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  );
}
