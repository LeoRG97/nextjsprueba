import 'bootstrap/dist/css/bootstrap.css';
import '@/global/styles/globals.css';
import '@/global/styles/blog.css';
import { Provider } from 'next-auth/client';
import autosize from 'autosize';
import { useEffect } from 'react';
import Head from 'next/head';
import Script from 'next/script';
import { wrapper } from '../store';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    autosize(document.querySelector('textarea'));
  }, []);

  return (
    <Provider
      session={pageProps.session}
    >
      <Head>
        <title>NTT Data</title>
      </Head>
      <Component {...pageProps} />
      <Script
        src="https://code.jquery.com/jquery-3.5.0.js"
        id="jQuery"
        strategy="beforeInteractive"
      />
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
