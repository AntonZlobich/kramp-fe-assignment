import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export const useSSRQuerySearchTracker = () => {
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => {
      const targetPathname = url.split('?')[0];
      if (targetPathname === router.pathname) {
        setIsSearching(true);
      } else {
        setIsSearching(false);
      }
    };
    const handleComplete = () => setIsSearching(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router.pathname]);

  return { isSearching };
}


