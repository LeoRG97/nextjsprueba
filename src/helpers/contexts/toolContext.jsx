import React, { createContext, useEffect, useState } from 'react';
import { generateMongoID } from '../mongoIDGenerator';

export const ToolContext = createContext();

const ToolContextProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    creditos: '',
    portada: '',
    categoria_id: '',
    categoria: '',
    objetivo: '',
    premium: false,
    url_imagen: '',
    emailDestinatario: '',
  });
  const [errors, setErrors] = useState({
    isValid: true,
  });
  const [contentValidated, setContentValidated] = useState(false);

  const [definition, setDefinition] = useState({ html: [] });
  const [justification, setJustification] = useState({ html: [] });
  const [usage, setUsage] = useState({ html: [] });

  const [diagnosticQuestions, setDiagnosticQuestions] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showAnswerModal, setShowAnswerModal] = useState(false);

  const handleNewAnswerModal = (show, questionId) => {
    setCurrentQuestion(questionId || null);
    setShowAnswerModal(show);
  };

  useEffect(() => {
    const { html: definitionArray } = definition;
    const { html: justificationArray } = justification;
    const { html: usageArray } = usage;
    if (definitionArray.length > 0 || justificationArray.length > 0 || usageArray.length > 0) {
      setContentValidated(true);
    } else {
      setContentValidated(false);
    }
  }, [definition, justification, usage]);

  const handleAddNewQuestion = (questionData) => {
    setDiagnosticQuestions([
      ...diagnosticQuestions,
      {
        _id: generateMongoID(),
        respuestas: [],
        ...questionData,
      },
    ]);
  };

  const handleAddNewAnswer = (answerData) => {
    setDiagnosticQuestions((questions) => {
      return questions.map((question) => {
        if (question._id === currentQuestion) {
          return {
            ...question,
            respuestas: [
              ...question.respuestas,
              { _id: generateMongoID(), ...answerData },
            ],
          };
        }
        return question;
      });
    });
  };

  const handleDeleteQuestion = (questionId) => {
    // elimina una pregunta del editor de diagnóstico
    setDiagnosticQuestions((questions) => questions.filter(
      (question) => question._id !== questionId,
    ));
  };

  const handleDeleteAnswer = (questionId, answerId) => {
    // elimina una respuesta asociada a una pregunta
    setDiagnosticQuestions((questions) => {
      return questions.map((question) => {
        if (question._id === questionId) {
          return {
            ...question,
            respuestas: question.respuestas.filter((resp) => resp._id !== answerId),
          };
        }
        return question;
      });
    });
  };

  return (
    <ToolContext.Provider value={{
      formData,
      setFormData,
      errors,
      setErrors,
      definition,
      setDefinition,
      usage,
      setUsage,
      justification,
      setJustification,
      contentValidated,
      diagnosticQuestions,
      setDiagnosticQuestions,
      handleAddNewQuestion,
      showQuestionModal,
      setShowQuestionModal,
      showAnswerModal,
      setShowAnswerModal,
      handleNewAnswerModal,
      currentQuestion,
      handleAddNewAnswer,
      handleDeleteQuestion,
      handleDeleteAnswer,
    }}
    >
      {children}
    </ToolContext.Provider>
  );
};

export default ToolContextProvider;
