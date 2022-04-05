import dynamic from 'next/dynamic';
import { getArtForHomeSSR } from '@/services/articles';
import Layout from '@/components/layout/Layout';
import HomePage from '@/components/home/home';

const Footer = dynamic(() => import('@/components/footer/Footer'));

const Home = ({ articulos }) => {
  return (
    <Layout>
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
