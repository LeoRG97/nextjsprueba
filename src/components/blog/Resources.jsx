import { useSession } from 'next-auth/client';
import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './blog.module.css';
import { showSubscribeAlert } from '@/reducers/alert';
import { BUCKET_URL } from '@/global/constants';

const Resources = ({ resources }) => {
  const [session] = useSession();
  const dispatch = useDispatch();

  const handleSubscribeModal = () => dispatch(showSubscribeAlert());

  const renderButton = (resource) => {
    switch (resource.tipo) {
      case 'reporte': {
        if (session) {
          return (
            <a href={`${BUCKET_URL}${resource.ruta}`} className="button button--theme-resource ms-2 me-2" target="_blank" rel="noreferrer" key={resource._id}>
              <span className="button__icon-left">P</span>
              Reporte
            </a>
          );
        }
        return (
          <button onClick={handleSubscribeModal} className="button button--theme-resource ms-2 me-2" key={resource._id}>
            <span className="button__icon-left">P</span>
            Reporte
          </button>
        );
      }
      case 'infografia': {
        if (session) {
          return (
            <a href={`${BUCKET_URL}${resource.ruta}`} className="button button--theme-resource ms-2 me-2" target="_blank" rel="noreferrer" key={resource._id}>
              <span className="button__icon-left">S</span>
              Infografía
            </a>
          );
        }
        return (
          <button onClick={handleSubscribeModal} className="button button--theme-resource ms-2 me-2" key={resource._id}>
            <span className="button__icon-left">S</span>
            Infografía
          </button>
        );
      }
      case 'video': {
        if (session) {
          return (
            <a href={resource.ruta} className="button button--theme-resource ms-2 me-2" target="_blank" rel="noreferrer" key={resource._id}>
              <span className="button__icon-left">N</span>
              Video
            </a>
          );
        }
        return (
          <button onClick={handleSubscribeModal} className="button button--theme-resource ms-2 me-2" key={resource._id}>
            <span className="button__icon-left">N</span>
            Video
          </button>
        );
      }
      default: {
        return null;
      }
    }
  };

  if (!resources || resources.length === 0) {
    return <></>;
  }

  return (
    <div className={styles.resourcesBlock}>
      <h3 className="title text-center">Continúa leyendo o visualiza en</h3>
      <div className="d-flex justify-content-center mt-4">
        {resources.map((res) => renderButton(res))}
      </div>
    </div>
  );
};

export default Resources;
