/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import Head from 'next/head';
import { BUCKET_URL } from '@/global/constants';

const HeadArticle = ({
  dataArticle,
  currentUrl,
}) => {
  // eslint-disable-next-line no-console
  return (
    <Head>
      <meta name="twitter:card" content="summary" />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={dataArticle.portada ? dataArticle.portada.titulo : ''} />
      <meta property="og:image" content={dataArticle.portada ? `${BUCKET_URL}${dataArticle.portada.ruta_imagen}` : ''} />
      <meta
        property="og:description"
        content={dataArticle.portada ? dataArticle.portada.descripcion : ''}
      />
      <meta property="fb:app_id" content="your fb id" />
      <meta name="description" content="NTTDATA" />
      <link rel="icon" href="/favicon.ico" />
      <title>{dataArticle.portada ? dataArticle.portada.titulo : ''}</title>
    </Head>
  );
};

HeadArticle.propTypes = {
  dataArticle: PropTypes.object.isRequired,
};

export default HeadArticle;
