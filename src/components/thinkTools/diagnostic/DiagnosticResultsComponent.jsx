import {
  Container, Row, Col,
} from 'react-bootstrap';
import {
  Layout,
} from '@/components';
import styles from '@/global/styles/Diagnostic.module.css';
import QuestionsMultiple from './QuestionsMultiple';
import QuestionsOnlyAnswer from './QuestionsOnlyAnswer';

const DiagnosticResultsComponent = ({ diagnostic }) => {
  return (
    <Layout>
      <Container fluid className={styles.content}>
        <Container className={styles.content_disgnostic_title}>
          <Row className="mt-5">
            <Col className="centered-content">
              <div className="d-flex justify-content-center">
                <div className={styles.container_icon}>
                  <span className="icon icon-xl">s</span>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col className="centered-content">
              <p className="text-md centered">Tu porcentaje de acierto fue de un</p>
            </Col>
          </Row>
          <Row className="mt-1">
            <Col className="centered-content">
              <h1 className="title-xl centered">{diagnostic && diagnostic.porcentage && `${diagnostic.porcentage} %`}</h1>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="centered-content">
              <h1 className="title-xl centered">Tus respuestas</h1>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container className={styles.content_disgnostic}>
        {
          diagnostic && diagnostic.diagnostico && diagnostic.diagnostico.length > 0 && (
            <Row className="mt-5 justify-content-center">
              <Col xl={7} md={7} sm={11}>
                {
                  diagnostic.diagnostico.map((diagnostico) => {
                    if (diagnostico.tipo === 'unica') {
                      return (
                        <QuestionsOnlyAnswer
                          key={diagnostico._id}
                          diagnostico={diagnostico}
                          response
                        />
                      );
                    }
                    return (
                      <QuestionsMultiple
                        key={diagnostico._id}
                        diagnostico={diagnostico}
                        response
                      />
                    );
                  })
                }
              </Col>
            </Row>
          )
        }
      </Container>
    </Layout>
  );
};

export default DiagnosticResultsComponent;
