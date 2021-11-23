import React from 'react';
import styles from '../../editor.module.css';
import QuestionsList from './questionsList/QuestionsList';

const DiagnosticEditor = () => {
  return (
    // div styles.editor
    <>
      <div className={`${styles.editorContent} ${styles.diagnosticContent}`} align="center">
        <div>
          <p className="subtitle text-center">
            Estructura aquí las preguntas del diagnóstico
          </p>

          <QuestionsList />
        </div>
      </div>
    </>
  );
};

export default DiagnosticEditor;
