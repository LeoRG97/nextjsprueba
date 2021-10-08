import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import useSWRInfinite from 'swr/infinite';
import { useSWRConfig } from 'swr';
import NoteComponent from './NoteComponent';
import ModalEditNote from './ModalEditNote';
import { ApiRoutes } from '@/global/constants';
import { fetchData } from '@/services/swr';
import LoadingIndicator from '@/components/loadingIndicator/LoadingIndicator';
import { deleteNotesService, updateNotesService } from '@/services/notes';
import LoadingIndicatorModal from '@/components/modalsIndicators/LoadingModal';
import SuccessIndicatorModal from '@/components/modalsIndicators/SuccesModal';
import ErrorIndicatorModal from '@/components/modalsIndicators/ErrorModal';

const ProfileNotes = () => {
  const router = useRouter();
  const { mutate: globalMutate } = useSWRConfig();
  useEffect(() => {

  }, [router]);

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

  const saveNota = async (model) => {
    const saveModel = {
      titulo: model.titulo,
      descripcion: model.descripcion,
      nota: model.nota,
    };
    setLoadingText({
      textHeader: 'Actualizando información...',
      textBody: 'Esta operación podría tardar unos minutos, por favor espere.',
    });
    setSuccesText({
      textHeader: 'Información actualizada.',
      textBody: 'La información de la nota ha sido actualizada correctamente.',
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
      textHeader: 'Eliminando anotación...',
      textBody: 'Esta operación podría tardar unos minutos, por favor espere.',
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

  const isEmpty = data?.[size - 1]?.length === 0;

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
                Ver más notas
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
        textBody="Por favor, revice su información y vuelva a intentarlo."
      />
    </div>
  );
};

export default ProfileNotes;
