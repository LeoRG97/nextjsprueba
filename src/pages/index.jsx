import Head from 'next/head';
/* eslint-disable import/extensions */
import { Footer, Layout, HomePage } from '@/components';
// import styles from '@/global/styles/Home.module.css';
import { getArtForHomeSSR } from '@/services/articles';

const Home = ({ articulos }) => {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <HomePage articulos={articulos} />
      </main>
      <Footer />
    </Layout>
  );
};

export async function getStaticProps() {
  const articulos = await getArtForHomeSSR();
  return {
    props: {
      articulos,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 60 seconds
    revalidate: 60, // In seconds
  };
}

export default Home;
