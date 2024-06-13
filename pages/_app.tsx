// pages/_app.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '@/styles/globals.css'; // Include global styles here
import { DataProvider } from '../store/GlobalState';

interface MyAppProps {
  Component: React.ComponentType<any>;
  pageProps: any;
}

const MyApp: React.FC<MyAppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    // Check if the current page is the one where you want to exclude global styles
    const isExcludedPage = router.pathname === '/login';

    if (isExcludedPage) {
      // Ensure that the element exists before modifying its class
      const nextElement = document.getElementById('__next');
      if (nextElement) {
        nextElement.classList.add('no-global-styles');
      }
    }

    return () => {
      // Cleanup when the component unmounts
      if (isExcludedPage) {
        // Ensure that the element exists before modifying its class
        const nextElement = document.getElementById('__next');
        if (nextElement) {
          nextElement.classList.remove('no-global-styles');
        }
      }
    };
  }, [router.pathname]);

  return (
    <DataProvider>
      <Component {...pageProps} />
    </DataProvider>
  );
};

export default MyApp;
