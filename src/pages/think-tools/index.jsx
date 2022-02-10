import Head from 'next/head';
import { useDispatch } from 'react-redux';
import { Layout } from '@/components';
import styles from '@/global/styles/ThinkTools.module.css';
import { showToolsModal } from '@/reducers/alert';

export default function ThinkTools() {
  const dispatch = useDispatch();

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
          <div className="row p-5 d-flex align-items-center">
            <div className="col-lg-6 col-md-6 col-sm-12 px-4">
              <h1 className="title-xl">Soluciones creadas a la medida de tus objetivos</h1>
              <p className="py-4 text-md text--theme-light">
                Hemos preparado para ti, una serie de herramientas, especialmente
                diseñadas para obtener mejores resultados e impulsar el desarrollo
                de tu organización.
              </p>
              <div className={styles.btnTool}>
                <button onClick={() => dispatch(showToolsModal())} className="button button--theme-primary me-2">
                  Encuentra la herramienta para ti
                </button>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <img className="img-fluid my-2" src="/images/think-tools/Laboratorio.png" alt="Laboratorio" />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
