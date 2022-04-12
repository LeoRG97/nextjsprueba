import 'bootstrap/dist/css/bootstrap.css';
import '@/global/styles/globals.css';
import '@/global/styles/blog.css';
import '@/global/styles/policies.css';
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
        <title>NTT DATA - CX</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
      <Script
        type="text/javascript"
        id="hs-script-loader"
        async
        defer
        src="//js.hs-scripts.com/20382611.js"
        strategy="afterInteractive"
      />
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
