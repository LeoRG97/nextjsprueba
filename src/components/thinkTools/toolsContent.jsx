/* eslint-disable react/no-danger */
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import { BUCKET_URL } from '@/global/constants';
import styles from './tools.module.css';

const ToolsContent = ({ toolsInfo, toolsCode }) => {
  const setImage = (url) => {
    let stylleImg = null;
    if (url.includes(BUCKET_URL)) {
      stylleImg = url;
    } else {
      stylleImg = `${BUCKET_URL}${url}`;
    }
    return stylleImg;
  };

  return (
    <div className="texture-top">
      <Container fluid className="content-n-p">
        <div>
          <Container className={styles.content_tool}>
            <div className={styles.centered}>
              <h5 className="title">
                <span className={`icon ${styles.doots}`}>h</span>
                {toolsInfo.categoria}
                <span className={`icon ${styles.doots}`}>j</span>
              </h5>
              <p className="text-md">{toolsInfo.objetivo}</p>
              <Link href="/think-tools" passHref>
                <a>
                  <button className="button button--theme-warning"><span className="button__icon-left text--theme-warning">9</span>Explorar más herramientas</button>
                </a>
              </Link>
            </div>
          </Container>
        </div>
        <Container className={`${styles.content_tool} ${styles.no_top}`}>
          <Row>
            <Col lg="2" className="col-1"> </Col>
            <Col lg="8" className="col-12">
              <div className={`${styles.centered} ${styles.content_tool_title}`}>
                <h1 className="title-xl">{toolsInfo.nombre}</h1>
                <img src={setImage(toolsInfo.url_imagen)} alt="img" />
              </div>
              <Row className={styles.content_inspired}>
                <Col className="col-6">
                  <p className="text-md">Inspirado en:</p>
                  <p className="text-sm ">{toolsInfo.creditos}</p>
                </Col>
                <Col className={`col-6 ${styles.right}`}>
                  <a href="https://google.com">
                    <button className="button button--theme-primary">Descargar</button>
                  </a>
                </Col>
              </Row>
              <Row className={styles.content_info_tool}>
                <Col>
                  <h5 className="title-xl">¿Qué es y cómo se usa?</h5>
                  {
                    toolsCode && toolsCode.definition && (
                      toolsCode.definition.html.map((item) => {
                        return (
                          <div key={item.id}>
                            <div dangerouslySetInnerHTML={{ __html: item.tag }} />
                          </div>
                        );
                      })
                    )
                  }
                  <h5 className={`title ${styles.content_title_use}`}>¿Cómo se usa?</h5>
                  {
                    toolsCode && toolsCode.usage && (
                      toolsCode.usage.html.map((item) => {
                        return (
                          <div key={item.id}>
                            <div dangerouslySetInnerHTML={{ __html: item.tag }} />
                          </div>
                        );
                      })
                    )
                  }
                </Col>
              </Row>

            </Col>
            <Col lg="2" className="col-1"> </Col>
          </Row>
        </Container>
      </Container>
    </div>
  );
};

export default ToolsContent;
