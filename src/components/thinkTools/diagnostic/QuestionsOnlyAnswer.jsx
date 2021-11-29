import React, { useEffect, useState } from 'react';
import { Col } from 'react-bootstrap';
import styles from '@/global/styles/Diagnostic.module.css';

const QuestionsOnlyAnswer = ({
  diagnostico, onSendQuestion, response = false,
}) => {
  const [answerSelected, setAnswerSelected] = useState(0);
  const [answers, setAnswers] = useState({
    idQuestion: diagnostico._id,
    pregunta: diagnostico.pregunta,
    tipo: diagnostico.tipo,
    sumAllPoints: 0,
    sumQuestionPoints: 0,
    respuestas: [],
  });

  const sumUpAllPoints = (respuestas) => {
    let puntajeMasAlto = 0;
    respuestas.forEach(
      (element) => {
        if (element.puntaje > puntajeMasAlto) {
          puntajeMasAlto = element.puntaje;
        }
      },
    );
    setAnswers({ ...answers, sumAllPoints: puntajeMasAlto });
  };

  const selectOnlyOption = (value) => {
    if (value !== '') {
      if (diagnostico && diagnostico.respuestas) {
        let mapOnlyOption = {
          idAnswer: '',
          valor: '',
          puntaje: 0,
          check: true,
        };
        diagnostico.respuestas.forEach(
          (element) => {
            if (value === element._id) {
              mapOnlyOption = {
                idAnswer: element._id,
                valor: element.valor,
                puntaje: element.puntaje,
                check: true,
              };
            }
          },
        );
        setAnswerSelected(value);
        setAnswers({
          ...answers,
          respuestas: [mapOnlyOption],
          sumQuestionPoints: mapOnlyOption.puntaje,
        });
        onSendQuestion({
          ...answers,
          respuestas: [mapOnlyOption],
          sumQuestionPoints: mapOnlyOption.puntaje,
        });
      }
    } else {
      setAnswerSelected(value);
      setAnswers({
        idQuestion: diagnostico._id,
        pregunta: diagnostico.pregunta,
        tipo: diagnostico.tipo,
        sumAllPoints: 0,
        sumQuestionPoints: 0,
        respuestas: [],
      });
      onSendQuestion({
        ...answers,
        respuestas: [],
        sumQuestionPoints: 0,
      });
    }
  };

  useEffect(() => {
    if (answers && answers.sumAllPoints === 0) {
      sumUpAllPoints(diagnostico.respuestas);
    }
  }, [answers]);

  return (
    <div className="mb-3" key={diagnostico._id}>
      <p className={`${styles.diagnostic_question} text--theme-light text-bold`}>{diagnostico.pregunta}</p>
      <Col xl={12} md={12} sm={12}>
        <div className="select-arrow">
          <select
            id="rol"
            name="rol"
            placeholder="Selecciona uno"
            className="select"
            value={answerSelected}
            onChange={(event) => selectOnlyOption(event.target.value)}
          >
            {
              !response && <option value="">Selecciona uno</option>
            }
            {
              diagnostico.respuestas.map((respuesta) => {
                return (
                  <option
                    key={respuesta._id}
                    value={respuesta._id}
                  >{respuesta.valor}
                  </option>
                );
              })
            }
          </select>
        </div>
      </Col>
    </div>
  );
};

export default QuestionsOnlyAnswer;
