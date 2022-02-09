/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { BUCKET_URL } from '@/global/constants';
import styles from './course.module.css';
import OptionDropdown from '@/components/optionsDropdown/OptionsDropdown';
import { DeleteModal } from '@/components';
import { showPremiumAlert } from '@/reducers/alert';
import { premiumUserAccess } from '@/helpers/accessVerifiers';

const CourseDetailComponent = ({
  curso, classContent, isAdmin = false, onDelete, estado,
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [optionsModal, setOptionsModal] = useState({});
  const { data: profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const router = useRouter();

  const showCourse = () => {
    if (curso.estatus === 'borrador') {
      return '';
    }
    if (curso.exclusivo && !premiumUserAccess(profile.role)) {
      return dispatch(showPremiumAlert());
    }
    return router.push(`/courses/${curso.slug}`);
  };

  const handleUpdate = () => {
    router.push(`/editor/course/${curso._id}`);
  };

  const deleteCourseFunc = (id) => {
    setOptionsModal({
      fncConfirm: id,
      cancel: 'Cancelar',
      confirm: 'Eliminar curso',
      textHeader: 'Alerta',
      textBody: 'Estás apunto de eliminar este curso ¿Seguro que deseas continuar?',
    });
    setModalDelete(true);
  };

  const onThisDelete = () => {
    setModalDelete(false);
    onDelete(optionsModal.fncConfirm);
  };

  const [options] = useState([
    {
      option: 'Modificar',
      event: true,
      eventName: (handleUpdate),
      data: true,
      iconType: 'K',
    },
    {
      option: 'Eliminar',
      event: true,
      eventName: (() => deleteCourseFunc(curso._id)),
      data: true,
      iconType: 'L',
    },
  ]);
  return (
    curso ? (
      <>
        <div
          key="id"
          className={`${styles.cardContainer} ${curso.estatus === 'borrador' && styles.draft}`}
          onMouseEnter={() => setShowOptions(true)}
          onMouseLeave={() => setShowOptions(false)}
        >
          <div className={estado !== 'borrador' ? `${styles.cardImageContainer} ${classContent} ${isAdmin && styles.adminOptions}` : `${styles.cardContainerNotFocus} ${styles.cardImageContainer} ${classContent} ${isAdmin && styles.adminOptions}`}>
            {
              isAdmin && showOptions && (
                <>
                  <div className={styles.options}>
                    <OptionDropdown
                      options={options}
                    />
                  </div>
                </>

              )
            }
            {isAdmin && (
              <div className={styles.optionsMobile}>
                <OptionDropdown
                  options={options}
                />
              </div>
            )}
            <div className={`text-sm text--theme-light ${styles.trendingLabel}`}>
              {
                curso.categorias && curso.categorias.length > 0 ? (
                  <>
                    {curso.categorias[0].nombre || ''}{' '}
                  </>
                ) : (
                  'Sin categoría'
                )
              }
            </div>
            {curso.exclusivo && !isAdmin && (
              <div className={`text-sm text--theme-light ${styles.trendingLabel} ${styles.premium}`}>
                Premium{' '}<span className="icon text--theme-light">R</span>
              </div>
            )}
            <div className={styles.image}>
              {curso.portada ? (
                <Image
                  src={`${BUCKET_URL}${curso.portada}`}
                  alt={curso.titulo || ''}
                  layout="fill"
                  onClick={showCourse}
                  objectFit="cover"
                />
              ) : (
                <div className={styles.emptyImg}>
                  <span className="icon">E</span>
                </div>
              )}
            </div>
          </div>
          {
            curso.autor ? (
              <div onClick={showCourse} className={styles.cardNumbersContainer}>
                {/* <div className="text-sm">{'Un curso de '} {curso.usuario_id.name || ''} {curso.usuario_id.apellidos || ''}</div> */}
                <div className={`text-sm ${styles.likesContainer}`}><span className="icon">c</span>{' '}{curso.likes || 0}</div>
                <div className={`text-sm ${styles.peopleContainer}`}><span className="icon">Z</span>{' '}{curso.subscripciones || 0}</div>
              </div>
            ) : (<></>)
          }
          {
            curso.titulo ? (
              <>
                <div onClick={showCourse} className={`title ${styles.cardMargin}`}>
                  {curso.titulo || 'Sin título'}
                </div>
              </>
            ) : (
              <>
                <div className={`title ${styles.cardMargin}`}>
                  Sin título
                </div>
              </>
            )
          }
          {
            curso.descripcion ? (
              <>
                <div onClick={showCourse} className="text-sm text--theme-light">
                  {curso.descripcion || 'Sin descripción'}
                </div>
              </>
            ) : (
              <>
                <div className="text-sm text--theme-light">
                  Sin descripción
                </div>
              </>
            )
          }
        </div>
        <DeleteModal
          show={modalDelete}
          onClose={() => setModalDelete(false)}
          functionDelete={() => onThisDelete()}
          btnConfirm={optionsModal.confirm}
          btnCancel={optionsModal.cancel}
          textHeader={optionsModal.textHeader}
          textBody={optionsModal.textBody}
        />
      </>
    ) : (<></>)
  );
};

export default CourseDetailComponent;
