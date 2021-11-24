import React, { useContext, useEffect } from 'react';
import { ToolContext } from '@/helpers/contexts/toolContext';
import styles from '../../editor.module.css';
import QuestionModal from './modals/questionModal/QuestionModal';
import QuestionsList from './questionsList/QuestionsList';
import AnswerModal from './modals/answerModal/AnswerModal';

const DiagnosticEditor = ({ initialData }) => {
  const {
    showQuestionModal,
    showAnswerModal,
    setShowQuestionModal,
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
        onClose={() => setShowQuestionModal(false)}
      />
      <AnswerModal
        show={showAnswerModal}
        onClose={() => handleNewAnswerModal(false)}
      />
    </>
  );
};

export default DiagnosticEditor;
