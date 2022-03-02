import React, { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import useSWR, { useSWRConfig } from 'swr';
import { useSession } from 'next-auth/client';
import CardAccordionComponent from './CardAccordionComponent';
import styles from './accordion.module.css';
import { ApiRoutes } from '@/global/constants';
import { fetchData } from '@/services/swr';
import { DeleteModal, LoadingIndicator, SuccessIndicatorModal } from '@/components';
import CardDiagnosticsComponent from './CardDiagnosticsComponent';
import LoadingIndicatorModal from '@/components/modalsIndicators/LoadingModal';
import ErrorIndicatorModal from '@/components/modalsIndicators/ErrorModal';
import { deleteToolService } from '@/services/tools';

const AccordionComponent = ({
  isEditable, isModalClose, filter,
}) => {
  const [accordionData, setAccordionData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalDelete, setModalDelete] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState(false);
  const [toolIdDelete, setToolIdDelete] = useState('');

  const { data: categories } = useSWR(ApiRoutes.ToolsCategories, fetchData);
  const { data: tools, mutate } = useSWR(ApiRoutes.Tools, fetchData);
  const { mutate: globalMutate } = useSWRConfig();
  const [session] = useSession();

  const deleteTool = async () => {
    setModalDelete(false);
    setModalLoading(true);
    setModalSuccess(false);
    setModalError(false);
    const res = await deleteToolService(toolIdDelete);
    if (res.ok) {
      mutate();
      globalMutate([ApiRoutes.UserTotals, session.user.id]);
      setModalLoading(false);
      setModalSuccess(true);
      setModalError(false);
      setModalDelete(false);
      setToolIdDelete('');
    } else {
      setModalLoading(false);
      setModalSuccess(false);
      setModalError(true);
      setModalDelete(false);
    }
  };

  const handlePrepareDelete = (id) => {
    setToolIdDelete(id);
    setModalDelete(true);
  };

  const handleCancelDelete = () => {
    setModalDelete(false);
    setToolIdDelete('');
  };

  useEffect(() => {
    if (categories && tools) {
      const filteredCategories = filter ? categories.data.filter((item) => (filter === 'diagnostic' ? item.nombre === 'Diagnosticar' : item.nombre !== 'Diagnosticar')) : categories.data;
      const newArray = filteredCategories.map((cat) => {
        const categoryTools = tools.data.filter((item) => item.categoria_id === cat._id);
        return {
          ...cat,
          herramientasCategoria: categoryTools,
        };
      });
      setAccordionData(newArray);
      setLoading(false);
    }
  }, [categories, tools]);

  return (
    <div>
      <div className="row justify-content-center">
        {loading ? <LoadingIndicator /> : (
          <div className={styles.accordion_wrapper}>
            <Accordion className={styles.accordion_container}>
              {
                (!filter || filter !== 'diagnostic') ? (
                  <>
                    {
                      accordionData.map((card, index) => {
                        return (
                          <CardAccordionComponent
                            key={card._id}
                            number={index}
                            data={card}
                            isEditable={isEditable}
                            onDelete={handlePrepareDelete}
                            isModalClose={isModalClose}
                          />
                        );
                      })
                    }
                  </>
                ) : (
                  <CardDiagnosticsComponent
                    data={accordionData}
                    isEditable={isEditable}
                    onDelete={handlePrepareDelete}
                  />
                )
              }
            </Accordion>
          </div>
        )}
      </div>
      <DeleteModal
        show={modalDelete}
        onClose={handleCancelDelete}
        functionDelete={deleteTool}
        btnConfirm={`Eliminar ${filter === 'tool' ? 'herramienta' : 'diagnóstico'}`}
        btnCancel="Cancelar"
        textHeader="Alerta"
        textBody={`Estás a punto de eliminar ${filter === 'tool' ? 'esta herramienta' : 'este diagnóstico'} y todo su contenido ¿Seguro que deseas continuar?`}
      />
      <LoadingIndicatorModal
        show={modalLoading}
        onClose={() => setModalLoading(false)}
        textHeader="Eliminando información..."
        textBody="Esta operación podría tardar unos minutos, por favor espere."
      />
      <SuccessIndicatorModal
        show={modalSuccess}
        onClose={() => setModalSuccess(false)}
        textHeader={filter === 'tool' ? 'Herramienta eliminada' : 'Diagnóstico eliminado'}
        textBody={filter === 'tool'
          ? 'La herramienta ha sido eliminada exitosamente.'
          : 'El diagnóstico ha sido eliminado exitosamente.'}
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

export default AccordionComponent;
