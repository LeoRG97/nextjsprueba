/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../editor.module.css';
import { ToolPreview } from '@/components';
import TooltipContainer from '../editorComponents/tooltipContainer/TooltipContainer';
import LoadingIndicatorModal from '../../modalsIndicators/LoadingModal';
import SuccessIndicatorModal from '../../modalsIndicators/SuccesModal';
import VideoSection from './VideoSection';
import DescriptionSection from './DescriptionSection';
import ToolDetailsModal from '../modals/toolDetailsModal/ToolDetailsModal';
import { ToolContext } from '@/helpers/contexts/toolContext';
import ErrorIndicatorModal from '@/components/modalsIndicators/ErrorModal';
import { saveTool, updateTool, updateToolFile } from '@/services/tools';
import ModalZip from './ModalZip';

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
  } = useContext(ToolContext);
  const router = useRouter();
  const [showPublish, setShowPublish] = useState(false);
  const [validateDefinition, setValidateDefinition] = useState(false);
  const [validateDescription, setValidateDescription] = useState(false);
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

  const setPreview = () => {
    if (preview === false) {
      setToolPreview(true);
    } else {
      setToolPreview(false);
    }
  };

  useEffect(() => {
    if (initialData && initialData._id) {
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
      });
    }
  }, [initialData]);

  useEffect(() => {
    if (initialContent) {
      setDefinition(initialContent.definition);
      setUsage(initialContent.usage);
    }
  }, []);

  const handleOpenModal = () => {
    if (validateDefinition && validateDescription) {
      setShowPublish(true);
    } else {
      setErrorData({
        show: true,
        title: 'Error',
        message: 'No has agregado el contenido suficiente para tu publicación',
      });
    }
  };

  const handlePublish = async () => {
    const jsonData = { definition, usage };
    setShowPublish(false);
    setSubmitting(true);
    const blob = new Blob([JSON.stringify(jsonData)], {
      type: 'application/json',
    });
    const file = new File([blob], 'article.json', { type: 'application/json' });
    try {
      if (!initialData || !initialData._id) {
        const res = await saveTool(file, formData);
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

  return (
    <div>
      {preview ? (
        <ToolPreview preview={preview} setPreview={() => setPreview()} />
      ) : (
        <div className={styles.editor}>
          <div className={styles.editorContent} align="center">
            <div>
              <p className="subtitle text-center">
                Estructura aquí el contenido de tu herramienta
              </p>
              <h1 className="title-xl text-center">¿Qué es?</h1>
              <VideoSection setValidateContent={setValidateDefinition} />
              <h1 className="title-xl text-center">¿Cómo funciona?</h1>
              <DescriptionSection setValidateContent={setValidateDescription} />
            </div>
          </div>
          {/* EDITOR OPTIONS NAV */}
          <div className={styles.optionsContainer}>
            <TooltipContainer tooltipText="Publicar" placement="left">
              <div
                className={`icon-button icon-button--primary ${styles.optionsItem}`}
                onClick={handleOpenModal}
              >
                H
              </div>
            </TooltipContainer>

            {initialData._id && (
              <TooltipContainer
                tooltipText="Archivo de descarga"
                placement="left"
              >
                <div
                  onClick={() => setAttachmentZip(true)}
                  className={`icon-button icon-button--secondary ${styles.optionsItem}`}
                >
                  r
                </div>
              </TooltipContainer>
            )}

            <TooltipContainer tooltipText="Vista previa" placement="left">
              <div
                onClick={() => setPreview()}
                className={`icon-button icon-button--secondary ${styles.optionsItem}`}
              >
                C
              </div>
            </TooltipContainer>
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
        </div>
      )}
    </div>
  );
};

export default ToolEditorComponent;
