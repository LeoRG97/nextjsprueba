/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../editor.module.css';
import ToolPreview from './toolPreview';
import TooltipContainer from '../editorComponents/tooltipContainer/TooltipContainer';
import LoadingIndicatorModal from '../../modalsIndicators/LoadingModal';
import SuccessIndicatorModal from '../../modalsIndicators/SuccesModal';
import VideoSection from './toolContentEditor/VideoSection';
import DescriptionSection from './toolContentEditor/DescriptionSection';
import JustificationSection from './toolContentEditor/JustificationSection';
import ToolDetailsModal from '../modals/toolDetailsModal/ToolDetailsModal';
import { ToolContext } from '@/helpers/contexts/toolContext';
import ErrorIndicatorModal from '@/components/modalsIndicators/ErrorModal';
import { saveDiagnosticTool, saveTool, updateTool, updateToolFile } from '@/services/tools';
import ModalZip from './ModalZip';

import DiagnosticEditor from './diagnosticEditor';
import EmailModal from './diagnosticEditor/modals/emailModal/EmailModal';

/*
  Componente raíz del editor de herramientas.
  Contiene la vista principal del editor, la vista previa de la herramienta y
  el editor de diagnósticos.
*/

const ToolEditorComponent = ({
  initialData,
  setInitialData,
  initialContent,
  setInitialContent,
}) => {
  const {
    formData,
    setFormData,
    definition,
    usage,
    setDefinition,
    setUsage,
    justification,
    setJustification,
    contentValidated,
    diagnosticQuestions,
  } = useContext(ToolContext);
  const router = useRouter();
  const [showPublish, setShowPublish] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successData, setSuccessData] = useState({
    show: false,
    title: '',
    message: '',
  });
  const [errorData, setErrorData] = useState({
    show: false,
    title: '',
    message: '',
  });
  const [attachmentZip, setAttachmentZip] = useState(false);
  const [preview, setToolPreview] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [modalSaveMode, setModalSaveMode] = useState('');

  const setPreview = () => {
    if (preview === false) {
      setToolPreview(true);
    } else {
      setToolPreview(false);
    }
  };

  useEffect(() => {
    if (!formData.herramienta_id && initialData && initialData._id) {
      setFormData({
        herramienta_id: initialData._id,
        nombre: initialData.nombre,
        creditos: initialData.creditos || '',
        categoria_id: initialData.categoria_id,
        categoria: initialData.categoria,
        objetivo: initialData.objetivo,
        premium: initialData.premium,
        url_imagen: initialData.url_imagen,
        url_contenido: initialData.url_contenido,
        tipo: initialData.tipo,
        emailDestinatario: initialData.emailDestinatario,
      });
    }
  }, [initialData]);

  useEffect(() => {
    if (initialContent) {
      setDefinition(initialContent.definition || { html: [] });
      setJustification(initialContent.justification || { html: [] });
      setUsage(initialContent.usage || { html: [] });
    }
  }, []);

  const handleOpenModal = () => {
    if (contentValidated) {
      setShowPublish(true);
    } else {
      setErrorData({
        show: true,
        title: 'Operación no permitida',
        message: 'No has agregado contenido para tu herramienta.',
      });
    }
  };

  const handlePublish = async () => {
    const tipo = router.pathname.includes('diagnostic') ? 'diagnostico' : 'herramienta';
    const jsonData = { definition, justification, usage };
    setShowPublish(false);
    setSubmitting(true);
    const blob = new Blob([JSON.stringify(jsonData)], {
      type: 'application/json',
    });
    const file = new File([blob], 'article.json', { type: 'application/json' });
    try {
      if (!initialData || !initialData._id) {
        const res = await saveTool(file, { ...formData, tipo });
        if (res.ok) {
          setSubmitting(false);
          setSuccessData({
            show: true,
            title: 'Publicación finalizada',
            message: 'La herramienta ha sido publicada correctamente',
          });
          router.replace(`${router.asPath}/${res.data._id}`, undefined, {
            shallow: true,
          });
          setInitialData(res.data);
          setInitialContent(jsonData);
        }
      } else {
        const res = await updateTool(file, formData, initialData);
        if (res.ok) {
          setSubmitting(false);
          setSuccessData({
            show: true,
            title: 'Publicación finalizada',
            message: 'La herramienta ha sido publicada correctamente',
          });
        }
      }
    } catch (err) {
      setErrorData({
        show: true,
        title: 'Ha ocurrido un error',
        message: 'Vuelva a intentarlo más tarde',
      });
    }
  };

  const handleSubmitResources = async (resources) => {
    setSubmitting(true);
    const res = await updateToolFile(resources, initialData._id);
    setSubmitting(false);
    if (res.ok) {
      setSuccessData({
        show: true,
        title: 'Cambios guardados',
        message: 'Los recursos han sido actualizados exitosamente.',
      });
      setInitialData({ recursos: resources });
    } else {
      setErrorData({
        show: true,
        title: 'Ha ocurrido un error',
        message: 'Vuelva a intentarlo más tarde',
      });
    }
  };

  const handleZipModal = () => {
    if (initialData._id) {
      setAttachmentZip(true);
    } else {
      setErrorData({
        show: true,
        title: 'Operación no permitida',
        message: 'Para habilitar otras opciones de visualización de contenido, primero debes publicar tu herramienta.',
      });
    }
  };

  const handleDiagnosticButton = () => {
    const [toolId] = router.query.data || '';
    if (initialData._id) {
      // navegar al editor de preguntas y respuestas
      router.push({
        pathname: `/editor/diagnostic/${toolId}`,
        query: { edit: 'questions' },
      }, undefined, { shallow: true });
    } else {
      setErrorData({
        show: true,
        title: 'Operación no permitida',
        message: 'Para crear tu diagnóstico, primero debes guardar tu herramienta.',
      });
    }
  };

  const { edit } = router.query;
  const showQuestionsEditor = edit === 'questions'; // si es "true", cambia la vista al editor de preguntas
  const contentType = router.pathname.includes('diagnostic') ? 'diagnostic' : 'tool'; // para determinar si el contenido será una herramienta normal o un diagnóstico

  const handleSubmitQuestions = async (email) => {
    setShowEmailModal(false);
    setSubmitting(true);
    const diagnosticData = {
      emailDestinatario: email,
      diagnostico: diagnosticQuestions,
    };
    const res = await saveDiagnosticTool(diagnosticData, initialData._id);
    setSubmitting(false);
    if (res.ok) {
      setSuccessData({
        show: true,
        title: 'Diagnóstico añadido',
        message: 'El diagnóstico ha sido añadido exitosamente',
      });
      router.back();
    } else {
      setErrorData({
        show: true,
        title: 'Ha ocurrido un error',
        message: 'Vuelva a intentarlo más tarde',
      });
    }
  };

  const handleSaveDiagnosticButton = () => {
    if (diagnosticQuestions.length < 4) {
      setErrorData({
        show: true,
        title: 'Operación no permitida',
        message: 'Debes agregar al menos 4 preguntas al diagnóstico',
      });
    } else if (!formData.emailDestinatario) {
      setShowEmailModal(true);
      setModalSaveMode('submit');
    } else {
      handleSubmitQuestions(formData.emailDestinatario);
    }
  };

  const handleOpenEmailModal = () => {
    setShowEmailModal(true);
    setModalSaveMode('local');
  };

  const handleReturnButton = () => {
    if (preview) {
      setPreview(false);
    } else {
      router.back();
    }
  };

  return (
    <div>
      <TooltipContainer placement="right" tooltipText="Regresar">
        <button
          className={`icon-button icon-button--secondary ${styles.returnButton}`}
          onClick={handleReturnButton}
        >
          a
        </button>
      </TooltipContainer>
      <div className={styles.editor}>
        {showQuestionsEditor && <DiagnosticEditor initialData={initialData.diagnostico} />}
        {preview && <ToolPreview preview={preview} setPreview={() => setPreview()} />}

        {!preview && !showQuestionsEditor && (
          <div className={styles.editorContent} align="center">
            <div>
              <p className="subtitle text-center">
                {contentType === 'diagnostic'
                  ? 'Estructura aquí la descripción del diagnóstico'
                  : 'Estructura aquí el contenido de tu herramienta'}
              </p>
              <h1 className="title-xl text-center">¿Qué es?</h1>
              <VideoSection />
              <h1 className="title-xl text-center">¿Por qué debería usarlo?</h1>
              <JustificationSection />
              <h1 className="title-xl text-center">¿Cómo lo uso?</h1>
              <DescriptionSection />
            </div>
          </div>
        )}

        <div className={styles.optionsContainer}>
          {!preview && !showQuestionsEditor && (
            <>
              <TooltipContainer tooltipText="Publicar" placement="left">
                <button
                  className={`icon-button icon-button--primary ${styles.optionsItem}`}
                  onClick={handleOpenModal}
                >
                  H
                </button>
              </TooltipContainer>

              {contentType === 'tool' && (
                <TooltipContainer
                  tooltipText="Archivo de descarga"
                  placement="left"
                >
                  <button
                    onClick={handleZipModal}
                    className={`icon-button icon-button--secondary ${styles.optionsItem}`}
                  >
                    r
                  </button>
                </TooltipContainer>
              )}

              {contentType === 'diagnostic' && (
                <TooltipContainer
                  tooltipText="Añadir preguntas"
                  placement="left"
                >
                  <button
                    onClick={handleDiagnosticButton}
                    className={`icon-button icon-button--secondary ${styles.optionsItem}`}
                  >
                    t
                  </button>
                </TooltipContainer>
              )}

              <TooltipContainer tooltipText="Vista previa" placement="left">
                <button
                  onClick={() => setPreview()}
                  className={`icon-button icon-button--secondary ${styles.optionsItem}`}
                >
                  C
                </button>
              </TooltipContainer>
            </>
          )}

          {showQuestionsEditor && (
            <>
              <TooltipContainer tooltipText="Guardar diagnóstico" placement="left">
                <button
                  onClick={handleSaveDiagnosticButton}
                  className={`icon-button icon-button--primary ${styles.optionsItem}`}
                >
                  s
                </button>
              </TooltipContainer>

              <TooltipContainer tooltipText="Actualizar destinatario" placement="left">
                <button
                  onClick={handleOpenEmailModal}
                  className={`icon-button icon-button--secondary ${styles.optionsItem}`}
                >
                  J
                </button>
              </TooltipContainer>
            </>
          )}
        </div>

        <ToolDetailsModal
          show={showPublish}
          onClose={() => setShowPublish(false)}
          onPublish={handlePublish}
        />
        <LoadingIndicatorModal
          show={submitting}
          onClose={() => setSubmitting(false)}
          textHeader="Guardando cambios"
          textBody="Esta operación podría tardar unos minutos, por favor espere."
        />
        <SuccessIndicatorModal
          show={successData.show}
          onClose={() => setSuccessData({ ...successData, show: false })}
          textHeader={successData.title}
          textBody={successData.message}
        />
        <ErrorIndicatorModal
          show={errorData.show}
          onClose={() => setErrorData({ ...errorData, show: false })}
          textHeader={errorData.title}
          textBody={errorData.message}
        />
        <ModalZip
          initialData={initialData && initialData.recursos}
          show={attachmentZip}
          onClose={() => setAttachmentZip(false)}
          onSubmit={handleSubmitResources}
        />
        <EmailModal
          show={showEmailModal}
          onClose={() => setShowEmailModal(false)}
          onSubmit={handleSubmitQuestions}
          saveMode={modalSaveMode}
        />
      </div>

    </div>
  );
};

export default ToolEditorComponent;
