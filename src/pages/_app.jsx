import 'bootstrap/dist/css/bootstrap.css';
import '@/global/styles/globals.css';
import { Provider } from 'next-auth/client';
import Head from 'next/head';
import { wrapper } from '../store';

function MyApp({ Component, pageProps }) {
  return (
    <Provider
      session={pageProps.session}
    >
      <Head>
        <title>NTT Data</title>
      </Head>
      <Component {...pageProps} />
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
