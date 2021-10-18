import { useState } from 'react';
import Head from 'next/head';
// import { useSession } from 'next-auth/client';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Layout, AccordionComponent } from '@/components';
import styles from '@/global/styles/ThinkTools.module.css';
import { fetchTools, fetchToolsCategories } from '@/services/tools';
import { showSubscribeAlert } from '@/reducers/alert';

export default function ThinkTools({ toolsData }) {
  const [onShowTools, setOnShowTools] = useState(false);
  const dispatch = useDispatch();

  const userNotSession = () => {
    setOnShowTools(false);
    // setModal(true);
    dispatch(showSubscribeAlert());
  };

  return (
    <Layout>
      <Head>
        <title>Think Tools</title>
        <meta name="description" content="NTT Data Think Tools" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`container-fluid pt-5 ${styles.textureBg}`}>
        <div className={
          `container mt-5 ${styles.contentHeight}
          d-flex justify-content-center align-items-center`
        }
        >

          <div className={`row p-5 d-flex align-items-center  ${onShowTools && styles.modalOpen}`}>
            <div className="col-lg-6 col-md-6 col-sm-12 px-4">
              <h1 className="title-xl">Soluciones a medida de sus objetivos</h1>
              <p className="py-4 text-sm text--theme-light">
                Hemos preparado para ti, una serie de herramientas,
                especialmente diseñadas para obtener mejores resultados
                e impulsar su desarrollo personal.
              </p>
              <div className={styles.btnTool}>
                <button onClick={() => setOnShowTools(!onShowTools)} className="button button--theme-primary me-2">
                  Encuentra tu herramienta
                </button>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <img className="img-fluid my-2" src="/images/think-tools/Laboratorio.png" alt="Laboratorio" />
            </div>
          </div>
          <Modal
            show={onShowTools}
            size="md"
            centered
            onHide={() => setOnShowTools(!onShowTools)}
          >
            <div className={`container-fluid ${styles.modalInner}`}>
              <h1 className="title-xl text-center py-3">Me gustaría...</h1>
              <div className={styles.accordion}>
                <AccordionComponent
                  accordionData={toolsData}
                  isModalClose={() => userNotSession()}
                />
              </div>
            </div>
          </Modal>
          {/* ) : (<></>) */}
        </div>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const categories = await fetchToolsCategories();
  const tools = await fetchTools();

  const toolsData = categories.map((cat) => {
    const categoryTools = tools.filter((item) => item.categoria_id === cat._id);
    return {
      ...cat,
      herramientasCategoria: categoryTools,
    };
  });

  return {
    props: {
      toolsData,
    },
    revalidate: 60,
  };
}
