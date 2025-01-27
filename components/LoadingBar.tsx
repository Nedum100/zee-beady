'use client';

import { useEffect } from 'react';
import NProgress from 'nprogress';
import { usePathname, useSearchParams } from 'next/navigation';
import 'nprogress/nprogress.css';

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.3,
});

export function LoadingBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.start();
    
    const timer = setTimeout(() => {
      NProgress.done();
    }, 1000); // Longer timeout

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [pathname, searchParams]);

  return null;
} 