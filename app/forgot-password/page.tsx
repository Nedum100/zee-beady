'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ForgotPasswordForm } from "@/components/ForgotPasswordForm";

function ForgotPasswordContent() {
  const searchParams = useSearchParams();
  return (
    <div className="container mx-auto max-w-md px-4 py-8">
      <ForgotPasswordForm />
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForgotPasswordContent />
    </Suspense>
  );
} 