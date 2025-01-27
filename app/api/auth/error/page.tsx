 // /app/api/auth/error/page.tsx
 // /app/auth/error/page.tsx

 import React, { Suspense } from 'react';
 import ClientAuthError from './ClientAuthError';
 
 export default function AuthErrorPage() {
   return (
     <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Suspense fallback={<div>Loading...</div>}>
            <ClientAuthError />
         </Suspense>
     </div>
   );
 }