import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import styles from '@/global/styles/Diagnostic.module.css';
import { CheckboxComponent } from '@/components';

const QuestionsMultiple = ({
  diagnostico, onSendQuestion, response = false,
}) => {
  const [answers, setAnswers] = useState({
    idQuestion: diagnostico._id,
    pregunta: diagnostico.pregunta,
    tipo: diagnostico.tipo,
    sumAllPoints: 0,
    sumQuestionPoints: 0,
    respuestas: [],
  });
  const [puntajeQ, setPuntaje] = useState(0);

  const sumUpAllPoints = (respuestas, totalQuestions, sumAllAnswers) => {
    let puntajeFinal = 0;
    respuestas.forEach(
      (element) => {
        puntajeFinal += element.puntaje;
      },
    );
    if (sumAllAnswers) {
      setAnswers({ ...answers, sumQuestionPoints: puntajeFinal });
    } else if (!totalQuestions) {
      setAnswers({ ...answers, sumAllPoints: puntajeFinal });
    } else {
      setPuntaje(puntajeFinal);
    }
  };

  const onCheckboxClicked = (idAnswer, isChecked, value, respuesta) => {
    const answersSelected = answers.respuestas;
    const map = {
      idAnswer,
      valor: respuesta,
      puntaje: value,
      check: isChecked,
    };
    const repetidos = answersSelected.filter((element) => element.idAnswer === idAnswer);
    if (isChecked) {
      if (repetidos.length === 0) {
        answersSelected.push(map);
        sumUpAllPoints(answersSelected, true);
      }
    } else if (repetidos.length > 0) {
      const index = answersSelected.findIndex((i) => i.idAnswer === idAnswer);
      if (index !== -1) {
        answersSelected.splice(index, 1);
      }
    }
    setAnswers({ ...answers, respuestas: answersSelected });
  };

  useEffect(() => {
    if (!response) {
      if (answers && answers.sumAllPoints === 0) {
        sumUpAllPoints(diagnostico.respuestas, false, false);
      }
      if (answers && answers.sumQuestionPoints === 0) {
        sumUpAllPoints(answers.respuestas, true, false);
      }
      if (puntajeQ !== answers.sumQuestionPoints) {
        sumUpAllPoints(answers.respuestas, false, true);
      }
      if (answers && answers.respuestas.length > 0) {
        onSendQuestion(answers);
      }
    }
  }, [answers, puntajeQ, response]);

  return (
    <div className="mb-3" key={diagnostico._id}>
      <p className={`${styles.diagnostic_question} text--theme-light text-bold`}>{diagnostico.pregunta}</p>
      {
        diagnostico.respuestas.map((respuesta) => {
          return (
            <Col xl={7} md={7} sm={11} key={respuesta._id}>
              <CheckboxComponent
                idAnswer={respuesta._id}
                onChange={onCheckboxClicked}
                answer={respuesta.valor}
                value={respuesta.puntaje}
                response={response}
              />
            </Col>
          );
        })
      }
    </div>
  );
};

export default QuestionsMultiple;
