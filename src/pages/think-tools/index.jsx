import { useState } from 'react';
import Head from 'next/head';
// import { useSession } from 'next-auth/client';
import { Modal } from 'react-bootstrap';
import { Layout, AccordionComponent } from '@/components';
import styles from '@/global/styles/ThinkTools.module.css';

export default function ThinkTools() {
  const [onShowTools, setOnShowTools] = useState(false);
  // const [session] = useSession();

  return (
    <Layout>
      <Head>
        <title>Think Tools</title>
        <meta name="description" content="NTT Data Think Tools" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container-fluid pt-5">
        <div className={
          `container mt-5 ${styles.contentHeight}
          d-flex justify-content-center align-items-center`
        }
        >

          <img
            className={`img-fluid position-absolute top-0 start-0
            ${styles.imgZindex}`}
            src="/images/think-tools/Fondo-textura.png"
            alt="Fondo-textura"
          />

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
            <div className={`container-fluid ${styles.modalInner} p-4`}>
              <h1 className="title-xl text-center py-3">Me gustaría...</h1>
              <div className={styles.accordion}>
                <AccordionComponent />
              </div>
            </div>
          </Modal>
          ) : (<></>)
        </div>
      </main>
    </Layout>
  );
}
