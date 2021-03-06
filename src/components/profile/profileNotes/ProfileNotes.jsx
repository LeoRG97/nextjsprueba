import React, { useState } from 'react';
import { useSession } from 'next-auth/client';
import useSWRInfinite from 'swr/infinite';
import useSWR, { useSWRConfig } from 'swr';
import dynamic from 'next/dynamic';
import NoteComponent from './NoteComponent';
import ModalEditNote from './ModalEditNote';
import { ApiRoutes } from '@/global/constants';
import { fetchData } from '@/services/swr';
import LoadingIndicator from '@/components/loadingIndicator/LoadingIndicator';
import { deleteNotesService, updateNotesService } from '@/services/notes';

const LoadingIndicatorModal = dynamic(() => import('@/components/modalsIndicators/LoadingModal'));
const SuccessIndicatorModal = dynamic(() => import('@/components/modalsIndicators/SuccesModal'));
const ErrorIndicatorModal = dynamic(() => import('@/components/modalsIndicators/ErrorModal'));

const ProfileNotes = () => {
  const { mutate: globalMutate } = useSWRConfig();

  const [modalNotes, setModalNotes] = useState(false);
  const [noteSelected, setNoteSelected] = useState({});
  const [modalLoading, setModalLoading] = useState(false);
  const [modalSucces, setModalSucces] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [loadingText, setLoadingText] = useState({
    textHeader: '',
    textBody: '',
  });
  const [succesText, setSuccesText] = useState({
    textHeader: '',
    textBody: '',
  });

  const [session] = useSession();

  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `${ApiRoutes.UserNotes}/${session.user.id}?pageSize=9&pageNum=${pageIndex + 1}&sort=desc`; // API endpoint
  };

  const {
    data, size, setSize, isValidating, mutate,
  } = useSWRInfinite(getKey, fetchData, { revalidateAll: true });

  const { data: total } = useSWR([ApiRoutes.UserTotals, session.user.id],
    { fallbackData: { valoraciones: 0 } });

  const { notas } = total;

  const saveNota = async (model) => {
    const saveModel = {
      titulo: model.titulo,
      descripcion: model.descripcion,
      nota: model.nota,
    };
    setLoadingText({
      textHeader: 'Actualizando informaci??n...',
      textBody: 'Esta operaci??n podr??a tardar unos minutos, por favor espere.',
    });
    setSuccesText({
      textHeader: 'Informaci??n actualizada.',
      textBody: 'La informaci??n de la nota ha sido actualizada correctamente.',
    });
    setModalNotes(false);
    setModalLoading(true);
    setModalSucces(false);
    setModalError(false);
    const res = await updateNotesService(model.idNota, saveModel);
    if (res.ok) {
      mutate(data);
      setModalLoading(false);
      setModalSucces(true);
      setModalError(false);
    } else {
      setModalLoading(false);
      setModalSucces(false);
      setModalError(true);
    }
  };

  const deleteNote = async (idNote) => {
    setLoadingText({
      textHeader: 'Eliminando anotaci??n...',
      textBody: 'Esta operaci??n podr??a tardar unos minutos, por favor espere.',
    });
    setSuccesText({
      textHeader: 'Nota eliminada',
      textBody: 'La nota ha sido eliminada exitosamente de su libreta de anotaciones.',
    });
    setModalLoading(true);
    setModalSucces(false);
    setModalError(false);
    const res = await deleteNotesService(idNote);
    if (res.ok) {
      mutate(data);
      globalMutate([ApiRoutes.UserTotals, session.user.id]);
      setModalLoading(false);
      setModalSucces(true);
      setModalError(false);
    } else {
      setModalLoading(false);
      setModalSucces(false);
      setModalError(true);
    }
  };

  const seeNotes = (note) => {
    setNoteSelected(note);
    setModalNotes(true);
  };

  const isEmpty = size * 9 >= notas;

  return (
    <div className="container">
      <div className="row">
        {data && data.map((page) => {
          return page.map((note) => (
            <div className="col-12 col-sm-6 col-md-4 mb-5" key={note._id}>
              <NoteComponent seeNote={seeNotes} note={note} deleteNote={deleteNote} />
            </div>
          ));
        })}
      </div>
      <div className="d-flex justify-content-center mt-5">
        <>
          {isValidating
            ? <LoadingIndicator />
            : !isEmpty && (
              <button
                className="button button--theme-secondary"
                onClick={() => setSize(size + 1)}
              >
                Ver m??s notas
              </button>
            )}
        </>
      </div>
      <ModalEditNote
        show={modalNotes}
        onClose={() => setModalNotes(false)}
        note={noteSelected}
        textSelected="text"
        saveNota={saveNota}
      />
      <LoadingIndicatorModal
        show={modalLoading}
        onClose={() => setModalLoading(false)}
        textHeader={loadingText.textHeader}
        textBody={loadingText.textBody}
      />
      <SuccessIndicatorModal
        show={modalSucces}
        onClose={() => setModalSucces(false)}
        textHeader={succesText.textHeader}
        textBody={succesText.textBody}
      />
      <ErrorIndicatorModal
        show={modalError}
        onClose={() => setModalError(false)}
        textHeader="Ha ocurrido un error"
        textBody="Por favor, revice su informaci??n y vuelva a intentarlo."
      />
    </div>
  );
};

export default ProfileNotes;
