import React, { useEffect, useState } from 'react';
import { Modal, Row } from 'react-bootstrap';
import styles from '../editor.module.css';
import { remove, upload } from '@/services/aws';
import InputFile from '@/components/formComponents/fileInput/FileInput';
import { BUCKET_URL } from '@/global/constants';

const ModalZip = ({
  show, onClose, initialData, onSubmit,
}) => {
  const [errors, setErrors] = useState({});
  const [zip, setZip] = useState({
    nombre: '', ruta: '',
  });

  const handleResources = async () => {
    setZip(initialData[0]);
  };

  useEffect(() => {
    if (initialData && initialData.length > 0) {
      handleResources();
    }
  }, [initialData]);

  const handleSaveFile = async (file, inputId) => {
    try {
      if (file.type !== 'application/zip') {
        return setErrors({ ...errors, [inputId]: 'El tipo del archivo no está permitido, sólo acepta .zip' });
      }

      setZip({ ...zip, loading: true });
      if (zip.ruta) await remove(`${BUCKET_URL}${zip.ruta}`);
      const res = await upload('thinkTools/tools-files', file);
      if (res.ok) {
        setZip({
          ...zip,
          nombre: file.name,
          ruta: res.file.split('.com/')[1],
          loading: false,
        });
        return setErrors({
          ...errors,
          zip: '',
        });
      }
      setErrors({
        ...errors,
        zip: 'No ha sido posible subir el archivo',
      });
      return setZip({ ...zip, loading: false });
    } catch (error) {
      setErrors({
        ...errors,
        zip: 'No ha sido posible subir el archivo',
      });
      return setZip({ ...zip, loading: false });
    }
  };

  const handleDeleteFile = async () => {
    setZip({
      ...zip,
      nombre: '',
    });
  };

  const handleEraseFiles = async () => {
    // eliminar archivos que fueron dados de baja
    if (zip.ruta && !zip.nombre) {
      await remove(`${BUCKET_URL}${zip.ruta}`);
    }
  };

  const onSave = async (e) => {
    e.preventDefault();

    handleEraseFiles();

    const submitData = [];
    if (zip.nombre) {
      submitData.push(zip);
    }
    onClose();
    onSubmit(submitData);
  };

  return (
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
          <h1 className="title">Archivo de descarga</h1>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={onSave}>
          <Row className="mb-3">
            <span className="subtitle">Plantilla de herramienta</span>
            <InputFile
              inputId="zip"
              fileName={zip.loading ? 'Cargando...' : zip.nombre}
              onSave={handleSaveFile}
              onDelete={handleDeleteFile}
            />
            <small className="text-sm text--theme-error">{errors.zip}</small>
          </Row>
        </form>
      </Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <button className="button button--theme-secondary" onClick={onClose}>Cancelar</button>
        <button
          type="submit"
          disabled={zip.loading}
          className="button button--theme-primary"
          onClick={onSave}
        >
          Guardar
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalZip;
