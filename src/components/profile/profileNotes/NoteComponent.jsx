/* eslint-disable no-console */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import styles from './notes.module.css';
import DropDownNotes from './DropDownNotes';
import { DeleteModal } from '@/components';

const NoteComponent = ({ note, seeNote, deleteNote }) => {
  const router = useRouter();
  useEffect(() => {

  }, [router]);

  const [hover, setHover] = useState(false);
  const [modalDeleteH, setModalDelete] = useState(false);
  const [optionsModal, setOptionsModal] = useState({});

  const deleteNoteFunc = () => {
    setOptionsModal({
      cancel: 'Cancelar',
      confirm: 'Eliminar anotación',
      textHeader: 'Alerta',
      textBody: 'Estás apunto de eliminar esta nota y todo su contenido ¿Seguro que deseas continuar?',
    });
    setModalDelete(true);
  };

  const [optionsDropDown] = useState([
    {
      option: 'Eliminar',
      event: true,
      eventName: () => deleteNoteFunc(),
      data: true,
      iconType: 'L',
    },
  ]);

  const dateUpdated = new Date(note.updatedAt.replace(/-/g, '/').replace(/T.+/, ''));
  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Augosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ];
  const date = `${monthNames[dateUpdated.getUTCMonth()]} ${dateUpdated.getUTCDate()}, ${dateUpdated.getUTCFullYear()}`;

  return (
    <>
      <div className={`${styles.selectedHover} container`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <div className={`${styles.headerNote} row justify-content-between`}>
          <div className="col-8">
            <div className={styles.date}>
              {date}
            </div>
          </div>
          <div className="col-3">
            {
              hover ? (
                <DropDownNotes options={optionsDropDown} data={note} />
              ) : (
                <></>
              )
            }
          </div>
        </div>
        <div className={`${styles.hoverMouse} row justify-content-left mt-3`} onClick={() => seeNote(note)}>
          <div className="col-12 col-md-11 title">
            <div className={styles.title_note}>{note.titulo}</div>
          </div>
          <div className="col-12 title mt-2">
            <div className={styles.desc_note}>
              {
                note.descripcion.length > 120 ? (
                  <>
                    {
                      `${note.descripcion.substr(0, 120)}...`
                    }
                  </>
                ) : (
                  <>{note.descripcion}</>
                )
              }
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.selected} container`}>
        <div className={`${styles.headerNote} row justify-content-between`}>
          <div className="col-8">
            <div className={styles.date}>
              {date}
            </div>
          </div>
          <div className="col-3">
            <DropDownNotes options={optionsDropDown} data={note} />
          </div>
        </div>
        <div className={`${styles.hoverMouse} row justify-content-left mt-3`} onClick={() => seeNote(note)}>
          <div className="col-12 col-md-11 title">
            <div className={styles.title_note}>{note.titulo}</div>
          </div>
          <div className="col-12 title mt-2">
            <div className={styles.desc_note}>
              {
                note.descripcion.length > 120 ? (
                  <>
                    {
                      `${note.descripcion.substr(0, 120)}...`
                    }
                  </>
                ) : (
                  <>{note.descripcion}</>
                )
              }
            </div>
          </div>
        </div>
      </div>
      <DeleteModal
        show={modalDeleteH}
        onClose={() => setModalDelete(false)}
        functionDelete={() => {
          setModalDelete(false);
          deleteNote(note._id);
        }}
        btnConfirm={optionsModal.confirm}
        btnCancel={optionsModal.cancel}
        textHeader={optionsModal.textHeader}
        textBody={optionsModal.textBody}
      />
    </>
  );
};

NoteComponent.propTypes = {
  note: PropTypes.object.isRequired,
  seeNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
};

export default NoteComponent;
