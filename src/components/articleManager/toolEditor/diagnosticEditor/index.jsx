import React, { useContext, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { ToolContext } from '@/helpers/contexts/toolContext';
import styles from '../../editor.module.css';
import QuestionsList from './questionsList/QuestionsList';

const QuestionModal = dynamic(() => import('./modals/questionModal/QuestionModal'));
const AnswerModal = dynamic(() => import('./modals/answerModal/AnswerModal'));

const DiagnosticEditor = ({ initialData }) => {
  const {
    showQuestionModal,
    showAnswerModal,
    handleCloseQuestionModal,
    handleNewAnswerModal,
    diagnosticQuestions,
    setDiagnosticQuestions,
  } = useContext(ToolContext);

  useEffect(() => {
    setDiagnosticQuestions(initialData);
  }, [initialData]);

  return (
    <>
      <div className={`${styles.editorContent} ${styles.diagnosticContent}`} align="center">
        <div>
          <p className="subtitle text-center">
            Estructura aquí las preguntas del diagnóstico
          </p>
          <QuestionsList
            questions={diagnosticQuestions}
          />
        </div>
      </div>
      <QuestionModal
        show={showQuestionModal}
        onClose={handleCloseQuestionModal}
      />
      <AnswerModal
        show={showAnswerModal}
        onClose={() => handleNewAnswerModal(false)}
      />
    </>
  );
};

export default DiagnosticEditor;
