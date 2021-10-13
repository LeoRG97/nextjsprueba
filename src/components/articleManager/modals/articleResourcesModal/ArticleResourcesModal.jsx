import { useSession } from 'next-auth/client';
import React, { useEffect, useState } from 'react';
import { Modal, Row } from 'react-bootstrap';
import styles from './resourcesModal.module.css';
import InputFile from '@/components/formComponents/fileInput/FileInput';
import { remove, upload } from '@/services/aws';
import { BUCKET_URL } from '@/global/constants';

const ArticleResourcesModal = ({
  show, onClose, initialData, onSubmit,
}) => {
  const [session] = useSession();
  const [reporte, setReporte] = useState({
    nombre: '', ruta: '', tipo: 'reporte',
  });
  const [infografia, setInfografia] = useState({
    nombre: '', ruta: '', tipo: 'infografia',
  });
  const [video, setVideo] = useState({
    nombre: '', ruta: '', tipo: 'video',
  });
  const [errors, setErrors] = useState({});

  const handleResources = async () => {
    initialData.forEach((item) => {
      if (item.tipo === 'reporte') {
        setReporte(item);
      } else if (item.tipo === 'infografia') {
        setInfografia(item);
      } else if (item.tipo === 'video') {
        setVideo(item);
      }
    });
  };

  const handleValidateForm = () => {
    const error = {
      isValid: true,
    };
    if (video.ruta && !video.ruta.match('https://.*')) {
      error.isValid = false;
      error.video = 'No es una URL válida';
    }
    return error;
  };

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      handleResources();
    }
  }, [initialData]);

  const handleSaveFile = async (file, inputId) => {
    if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'application/pdf') {
      return setErrors({ ...errors, [inputId]: 'El tipo del archivo no está permitido' });
    }
    setErrors({ ...errors, reporte: '', infografia: '' });
    const path = `${session.user.id}/article-files`;

    if (inputId === 'reporte') {
      setReporte({ ...reporte, loading: true });
      if (reporte.ruta) await remove(`${BUCKET_URL}${reporte.ruta}`);
      const res = await upload(path, file);
      if (res.ok) {
        setReporte({
          ...reporte,
          nombre: file.name,
          ruta: res.file.split('.com/')[1],
          loading: false,
        });
      } else {
        setErrors({
          ...errors,
          reporte: 'No ha sido posible subir el archivo',
        });
        setReporte({ ...reporte, loading: false });
      }
    }

    if (inputId === 'infografia') {
      setInfografia({ ...infografia, loading: true });
      if (infografia.ruta) await remove(`${BUCKET_URL}${infografia.ruta}`);
      const res = await upload(path, file);
      if (res.ok) {
        setInfografia({
          ...infografia,
          nombre: file.name,
          ruta: res.file.split('.com/')[1],
          loading: false,
        });
      } else {
        setErrors({
          ...errors,
          infografia: 'No ha sido posible subir el archivo',
        });
        setInfografia({ ...infografia, loading: false });
      }
    }
    return '';
  };

  const handleDeleteFile = async (inputId) => {
    if (inputId === 'reporte') {
      // if (!reporte._id) await remove(`${BUCKET_URL}${reporte.ruta}`);
      setReporte({
        ...reporte,
        nombre: '',
      });
    }
    if (inputId === 'infografia') {
      // if (!infografia._id) await remove(`${BUCKET_URL}${infografia.ruta}`);
      setInfografia({
        ...infografia,
        nombre: '',
      });
    }
  };

  const handleChangeVideo = (e) => {
    setVideo({
      ...video,
      nombre: e.target.value,
      ruta: e.target.value,
    });
  };

  const handleEraseFiles = async () => {
    // eliminar archivos que fueron dados de baja
    if (reporte.ruta && !reporte.nombre) {
      await remove(`${BUCKET_URL}${reporte.ruta}`);
    }
    if (infografia.ruta && !infografia.nombre) {
      await remove(`${BUCKET_URL}${infografia.ruta}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorObj = handleValidateForm();
    if (errorObj.isValid) {
      setErrors({});
      onClose();
      handleEraseFiles();
      const submitData = [];
      if (reporte.nombre) submitData.push(reporte);
      if (infografia.nombre) submitData.push(infografia);
      if (video.nombre) submitData.push(video);
      onSubmit(submitData);
    } else {
      setErrors({ ...errors, ...errorObj });
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        backdrop="static"
        keyboard={false}
        centered
        contentClassName={styles.modalContainer}
      >
        <Modal.Header>
          <Modal.Title>
            <h1 className="title">Opciones de visualización</h1>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <span className="subtitle">Reporte</span>
              <InputFile
                inputId="reporte"
                fileName={reporte.loading ? 'Cargando...' : reporte.nombre}
                onSave={handleSaveFile}
                onDelete={handleDeleteFile}
              />
              <small className="text-sm text--theme-error">{errors.reporte}</small>
            </Row>
            <Row className="mb-3">
              <span className="subtitle">Infografía</span>
              <InputFile
                inputId="infografia"
                fileName={infografia.loading ? 'Cargando...' : infografia.nombre}
                onSave={handleSaveFile}
                onDelete={handleDeleteFile}
              />
              <small className="text-sm text--theme-error">{errors.infografia}</small>
            </Row>
            <Row className="mb-2">
              <label className="subtitle">Video
                <input
                  type="text"
                  placeholder="URL"
                  className="input"
                  value={video.ruta}
                  onChange={handleChangeVideo}
                />
              </label>
              <small className="text-sm text--theme-error">{errors.video}</small>
            </Row>
          </form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <button className="button button--theme-secondary" onClick={onClose}>Cancelar</button>
          <button
            disabled={reporte.loading || infografia.loading}
            className="button button--theme-primary"
            onClick={handleSubmit}
          >
            Guardar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ArticleResourcesModal;
