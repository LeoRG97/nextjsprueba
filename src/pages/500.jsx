import Head from 'next/head';
import { ErrorPageComp } from '@/components';

export default function ErrorServerPage() {
  return (
    <>
      <Head>
        <title>NTT Data</title>
        <meta name="description" content="NTT Server error" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ErrorPageComp />
    </>
  );
}
