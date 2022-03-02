import Head from 'next/head';
import { Layout, ErrorPageComp } from '@/components';

export default function ErrorPage() {
  return (
    <Layout>
      <Head>
        <title>NTT Data</title>
        <meta name="description" content="NTT Data not found" />
      </Head>
      <ErrorPageComp />
    </Layout>
  );
}
