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

  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [questionEdit, setQuestionEdit] = useState(null);
  const [answerEdit, setAnswerEdit] = useState(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showAnswerModal, setShowAnswerModal] = useState(false);

  const handleNewAnswerModal = (show, questionId) => {
    setCurrentQuestionId(questionId || null);
    setAnswerEdit(null);
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

  const handleCloseQuestionModal = () => {
    setShowQuestionModal(false);
    setQuestionEdit(null);
  };

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
        if (question._id === currentQuestionId) {
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

  const handleSortQuestions = (event) => {
    if (event.destination) {
      const newQuestions = [...diagnosticQuestions];
      const [movedItem] = newQuestions.splice(event.source.index, 1);
      newQuestions.splice(event.destination.index, 0, movedItem);
      setDiagnosticQuestions([...newQuestions]);
    }
  };

  const handleSortAnswers = (event, questionId) => {
    if (event.destination) {
      setDiagnosticQuestions((questions) => {
        return questions.map((question) => {
          if (question._id === questionId) {
            const newAnswers = [...question.respuestas];
            const [movedItem] = newAnswers.splice(event.source.index, 1);
            newAnswers.splice(event.destination.index, 0, movedItem);
            return {
              ...question,
              respuestas: [...newAnswers],
            };
          }
          return question;
        });
      });
    }
  };

  const handleEditQuestionModal = (id) => {
    const questionToEdit = diagnosticQuestions.find((question) => question._id === id);
    setQuestionEdit(questionToEdit);
    setShowQuestionModal(true);
  };

  const handleUpdateQuestion = (id, data) => {
    setDiagnosticQuestions((questions) => {
      return questions.map((question) => {
        if (question._id === id) {
          return { ...question, ...data };
        }
        return question;
      });
    });
  };

  const handleEditAnswerModal = (questionId, answerId) => {
    const questionData = diagnosticQuestions.find((question) => question._id === questionId);
    const answerToEdit = questionData.respuestas.find((answer) => answer._id === answerId);
    setAnswerEdit(answerToEdit);
    setCurrentQuestionId(questionId);
    setShowAnswerModal(true);
  };

  const handleUpdateAnswer = (answerId, data) => {
    setDiagnosticQuestions((questions) => {
      return questions.map((question) => {
        if (question._id === currentQuestionId) {
          return {
            ...question,
            respuestas: question.respuestas.map((answer) => {
              if (answer._id === answerId) {
                return { ...answer, ...data };
              }
              return answer;
            }),
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
      handleCloseQuestionModal,
      showAnswerModal,
      setShowAnswerModal,
      handleNewAnswerModal,
      currentQuestionId,
      handleAddNewAnswer,
      handleDeleteQuestion,
      handleDeleteAnswer,
      handleSortQuestions,
      handleSortAnswers,
      handleEditQuestionModal,
      questionEdit,
      handleUpdateQuestion,
      handleEditAnswerModal,
      answerEdit,
      handleUpdateAnswer,
    }}
    >
      {children}
    </ToolContext.Provider>
  );
};

export default ToolContextProvider;
