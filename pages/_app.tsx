import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import '@/styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AutoTranslator from '@/components/AutoTranslator'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Register Service Worker for caching
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered successfully:', registration);
        })
        .catch((error) => {
          console.log('Service Worker registration failed:', error);
        });
    }

    // Performance monitoring - temporarily disabled due to API changes
    // TODO: Update web-vitals usage for v3+ API
    /*
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Monitor Core Web Vitals
      import('web-vitals').then(({ getCLS, getFCP, getFID, getLCP, getTTFB }) => {
        getCLS(console.log);
        getFCP(console.log);
        getFID(console.log);
        getLCP(console.log);
        getTTFB(console.log);
      });
    }
    */
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="//pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="preconnect" href="https://translate.google.com" />
        <link rel="preconnect" href="https://translate.googleusercontent.com" />
        <link rel="preconnect" href="https://ipapi.co" />

        {/* Google Analytics placeholder */}
        {/*
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
        */}
      </Head>
      <AutoTranslator>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </AutoTranslator>
    </>
  )
}

