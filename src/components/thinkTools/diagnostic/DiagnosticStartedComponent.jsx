import {
  Container, Row, Col, Form,
} from 'react-bootstrap';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import {
  Layout,
} from '@/components';
import styles from '@/global/styles/Diagnostic.module.css';
import QuestionsMultiple from './QuestionsMultiple';
import QuestionsOnlyAnswer from './QuestionsOnlyAnswer';
import ErrorIndicatorModal from '@/components/modalsIndicators/ErrorModal';
import LoadingIndicatorModal from '@/components/modalsIndicators/LoadingModal';
import { aviableDiagnostic, postDiagnostic } from '@/services/diagnostic';
import ModalAwaitDiagnostic from '@/components/modalsIndicators/ModalAwaitDiagnostic';

const DiagnosticStartedComponent = ({ toolsInfo, userId }) => {
  const router = useRouter();
  const [session] = useSession();
  const [diagnosticCompleteModal, setDiagnosticCompleteModal] = useState(false);
  const [diagnosticSaveModal, setDiagnosticSaveModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalAwaitDiagnostic, setModalAwaitDiagnostic] = useState(false);
  const [diagnostic, setDiagnostic] = useState({
    usuario_id: userId,
    emailDestinatario: toolsInfo.emailDestinatario,
    herramienta_id: toolsInfo._id,
    porcentaje: 0,
    diagnostico: [],
  });
  const onSendQuestion = (objectQuestion) => {
    const diagnosticSelected = diagnostic.diagnostico;
    if (objectQuestion && objectQuestion.tipo === 'multiple') {
      const repetidos = diagnosticSelected.filter(
        (element) => element.idQuestion === objectQuestion.idQuestion,
      );
      if (repetidos.length === 0) {
        diagnosticSelected.push(objectQuestion);
      } else if (repetidos.length > 0) {
        const index = diagnosticSelected.findIndex(
          (i) => i.idQuestion === objectQuestion.idQuestion,
        );
        if (index !== -1) {
          diagnosticSelected.splice(index, 1, objectQuestion);
        }
      }
      setDiagnostic({ ...diagnostic, diagnostico: diagnosticSelected });
    } else if (objectQuestion && objectQuestion.tipo === 'unica') {
      const repetidos = diagnosticSelected.filter(
        (element) => element.idQuestion === objectQuestion.idQuestion,
      );
      if (repetidos.length === 0) {
        diagnosticSelected.push(objectQuestion);
      } else if (repetidos.length > 0) {
        const index = diagnosticSelected.findIndex(
          (i) => i.idQuestion === objectQuestion.idQuestion,
        );
        if (index !== -1) {
          diagnosticSelected.splice(index, 1, objectQuestion);
        }
      }
      setDiagnostic({ ...diagnostic, diagnostico: diagnosticSelected });
    }
  };

  const handleSubmit = async (percent) => {
    if (percent) {
      const modelDiagnosticToSave = {
        diagnostico: [],
        usuario_id: diagnostic.usuario_id,
        emailDestinatario: diagnostic.emailDestinatario,
        herramienta_id: diagnostic.herramienta_id,
        porcentage: percent,
      };
      diagnostic.diagnostico.forEach(
        (element) => {
          const modelDiagnostico = {
            pregunta: element.pregunta,
            respuestas: [],
            tipo: element.tipo,
          };
          if (element && element.respuestas) {
            if (element.respuestas.length > 0) {
              element.respuestas.forEach(
                (respuesta) => {
                  const modelRespuestas = {
                    valor: respuesta.valor,
                    puntaje: respuesta.puntaje,
                    check: respuesta.check,
                  };
                  modelDiagnostico.respuestas.push(modelRespuestas);
                },
              );
            }
          }
          modelDiagnosticToSave.diagnostico.push(modelDiagnostico);
        },
      );
      const res = await postDiagnostic(modelDiagnosticToSave);
      if (res.ok) {
        setModalLoading(false);
        if (res.data) {
          router.push(`/diagnostic-results/${res.data._id}`);
        }
      } else {
        setDiagnosticSaveModal(true);
      }
    }
  };

  const calcPercent = () => {
    let totalSumAllPoints = 0;
    let totalSumQuestionPoints = 0;
    let percent = 0;
    diagnostic.diagnostico.forEach(
      (element) => {
        totalSumAllPoints += element.sumAllPoints;
        totalSumQuestionPoints += element.sumQuestionPoints;
      },
    );
    percent = (100 / totalSumAllPoints) * (totalSumQuestionPoints);
    setDiagnostic({ ...diagnostic, porcentaje: Math.round(percent) });
    handleSubmit(Math.round(percent));
  };

  const checkAviableDiagnostic = async () => {
    if (toolsInfo && session && session.user) {
      const res = await aviableDiagnostic(toolsInfo._id, session.user.id);
      if (res.ok) {
        calcPercent();
      } else {
        setModalLoading(false);
        setModalAwaitDiagnostic(true);
      }
    }
  };

  const validateDiagnostic = () => {
    const valid = [];
    if (diagnostic && toolsInfo) {
      if (diagnostic.diagnostico.length > 0) {
        diagnostic.diagnostico.forEach(
          (element) => {
            if (element.respuestas && element.respuestas.length > 0) {
              valid.push(true);
            } else {
              valid.push(false);
            }
          },
        );
      } else {
        valid.push(false);
      }
    }
    if (valid.length === toolsInfo.diagnostico.length) {
      const found = valid.find((result) => (result === false));
      if (found !== false) {
        setDiagnosticCompleteModal(false);
        setModalLoading(true);
        checkAviableDiagnostic();
      } else {
        setDiagnosticCompleteModal(true);
      }
    } else {
      setDiagnosticCompleteModal(true);
    }
  };

  return (
    <Layout>
      <Container fluid className={styles.content}>
        <Container className={styles.content_disgnostic_title}>
          <Row className="mt-5">
            <Col className="centered-content">
              <h1 className="title-xl centered">{toolsInfo.nombre || ''}</h1>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container className={styles.content_disgnostic}>
        {
          toolsInfo && toolsInfo.diagnostico && toolsInfo.diagnostico.length > 0 && (
            <Form>
              <Row className="mt-5 justify-content-center">
                <Col xl={7} md={7} sm={11}>
                  {
                    toolsInfo.diagnostico.map((diagnostico) => {
                      if (diagnostico.tipo === 'unica') {
                        return (
                          <QuestionsOnlyAnswer
                            key={diagnostico._id}
                            diagnostico={diagnostico}
                            onSendQuestion={onSendQuestion}
                          />
                        );
                      }
                      return (
                        <QuestionsMultiple
                          key={diagnostico._id}
                          diagnostico={diagnostico}
                          onSendQuestion={onSendQuestion}
                        />
                      );
                    })
                  }
                </Col>
              </Row>
              <Row className="mt-2 pb-5 justify-content-center">
                <Col xl={7} md={7} sm={11}>
                  <div className="mt-5 text-end">
                    <button className="button button--theme-primary me-2" type="button" onClick={() => validateDiagnostic()}>
                      <span className="button__icon-left">n</span>{' '}Enviar
                    </button>
                  </div>
                </Col>
              </Row>
            </Form>
          )
        }
      </Container>
      <ErrorIndicatorModal
        show={diagnosticCompleteModal}
        onClose={() => setDiagnosticCompleteModal(false)}
        textHeader="Ha ocurrido un error"
        textBody="Debes responder todas las preguntas"
      />
      <ErrorIndicatorModal
        show={diagnosticSaveModal}
        onClose={() => setDiagnosticSaveModal(false)}
        textHeader="Ha ocurrido un error"
        textBody="Por favor, vuelve a intentarlo."
      />
      <LoadingIndicatorModal
        show={modalLoading}
        onClose={() => {}}
        textHeader="Evaluando diagnóstico..."
        textBody="Esta operación podría tardar unos minutos, por favor espere."
      />
      <ModalAwaitDiagnostic
        show={modalAwaitDiagnostic}
        onClose={() => setModalAwaitDiagnostic(false)}
      />
    </Layout>
  );
};

export default DiagnosticStartedComponent;
