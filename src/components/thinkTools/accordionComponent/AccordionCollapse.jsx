import { useSession } from 'next-auth/client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';
import { reviewerAccess } from '@/helpers/accessVerifiers';
import { ApiRoutes } from '@/global/constants';
import { DeleteModal, SubscriptionModal, SuccessIndicatorModal } from '@/components';
import OptionDropdown from '@/components/optionsDropdown/OptionsDropdown';
import styles from './accordion.module.css';
import LoadingIndicatorModal from '@/components/modalsIndicators/LoadingModal';
import ErrorIndicatorModal from '@/components/modalsIndicators/ErrorModal';
import { deleteToolService } from '@/services/tools';

const AccordionCollapse = ({ herramienta, isEditable, mutate }) => {
  const router = useRouter();
  const [hover, setHover] = useState(false);
  const [session] = useSession();
  const [show, setModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalSucces, setModalSucces] = useState(false);
  const [modalError, setModalError] = useState(false);

  const { mutate: globalMutate } = useSWRConfig();

  const deleteTool = async (id) => {
    setModalDelete(false);
    setModalLoading(true);
    setModalSucces(false);
    setModalError(false);
    const res = await deleteToolService(id);
    if (res.ok) {
      mutate();
      globalMutate([ApiRoutes.UserTotals, session.user.id]);
      setModalLoading(false);
      setModalSucces(true);
      setModalError(false);
      setModalDelete(false);
    } else {
      setModalLoading(false);
      setModalSucces(false);
      setModalError(true);
      setModalDelete(false);
    }
  };

  const [optionsDropDown] = useState([
    {
      option: 'Modificar',
      iconType: 'K',
      event: true,
      eventName: (() => router.push(`/editor/tool/${herramienta._id}`)),
    },
    {
      option: 'Eliminar',
      iconType: 'L',
      event: true,
      eventName: (() => setModalDelete(true)),
    },
  ]);

  return (
    <div className={styles.content_tool}>
      <div className="row d-flex mb-2 justify-content-between align-items-center" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <div className="col-6 offset-2">
          {
            (session) ? (
              <Link href={`/think-tools/${herramienta.slug}`} passHref>
                <a>
                  <div className="text-md">{herramienta.objetivo}</div>
                  <div className="text--theme-secondary text-md">{herramienta.nombre}</div>
                </a>
              </Link>
            ) : (
              <div onClick={() => setModal(true)} className={styles.link_tool}>
                <div className="text-md">{herramienta.objetivo}</div>
                <div className="text--theme-secondary text-md">{herramienta.nombre}</div>
              </div>
            )
          }
        </div>
        <div className="col-4 d-flex justify-content-end">
          {(isEditable && reviewerAccess(session.user.role)) && (
            <>
              {
                hover ? (
                  <OptionDropdown options={optionsDropDown} />
                ) : (
                  <></>
                )
              }
            </>
          )}
          {(!isEditable && herramienta.premium) && (
            <div className={`text-sm text--theme-light ${styles.premiumLabel}`}>
              Premium{' '}<span className="icon text--theme-light">R</span>
            </div>
          )}
        </div>
        <SubscriptionModal show={show} setModal={setModal} />
        <DeleteModal
          show={modalDelete}
          onClose={() => setModalDelete(false)}
          functionDelete={() => deleteTool(herramienta._id)}
          btnConfirm="Eliminar herramienta"
          btnCancel="Cancelar"
          textHeader="Alerta"
          textBody="Estás apunto de eliminar esta herramienta y todo su contenido ¿Seguro que deseas continuar?"
        />
        <LoadingIndicatorModal
          show={modalLoading}
          onClose={() => setModalLoading(false)}
          textHeader="Eliminando información..."
          textBody="Esta operación podría tardar unos minutos, por favor espere."
        />
        <SuccessIndicatorModal
          show={modalSucces}
          onClose={() => setModalSucces(false)}
          textHeader="Herramienta eliminada"
          textBody="La herramienta ha sido eliminada exitosamente."
        />
        <ErrorIndicatorModal
          show={modalError}
          onClose={() => setModalError(false)}
          textHeader="Ha ocurrido un error"
          textBody="Por favor, revice su información y vuelva a intentarlo."
        />
      </div>
    </div>
  );
};

export default AccordionCollapse;
