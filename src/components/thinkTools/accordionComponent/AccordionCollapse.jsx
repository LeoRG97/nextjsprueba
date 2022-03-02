import { useSession } from 'next-auth/client';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { reviewerAccess, userAccess, vipUserAccess } from '@/helpers/accessVerifiers';
import OptionDropdown from '@/components/optionsDropdown/OptionsDropdown';
import styles from './accordion.module.css';
import { hideToolsModal, showPremiumAlert, showSubscribeAlert } from '@/reducers/alert';

const AccordionCollapse = ({
  herramienta, isEditable, onDelete,
}) => {
  const router = useRouter();
  const [hover, setHover] = useState(false);
  const [session] = useSession();

  const { data: profile } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const [optionsDropDown] = useState([
    {
      option: 'Modificar',
      iconType: 'K',
      event: true,
      eventName: (() => router.push(`/editor/${herramienta && herramienta.tipo && herramienta.tipo === 'diagnostico' ? 'diagnostic' : 'tool'}/${herramienta._id}`)),
    },
    {
      option: 'Eliminar',
      iconType: 'L',
      event: true,
      eventName: (() => onDelete(herramienta._id)),
    },
  ]);

  const handleSubscribeModal = () => {
    dispatch(showSubscribeAlert());
    dispatch(hideToolsModal());
  };

  const showTool = () => {
    if (!userAccess(profile.role)) {
      handleSubscribeModal();
    } else if (herramienta.premium && !vipUserAccess(profile.role)) {
      dispatch(showPremiumAlert());
    } else {
      router.push(`/${herramienta.tipo === 'herramienta' ? 'think-tools' : 'diagnostics'}/${herramienta.slug}`);
    }
  };

  return (
    <div className={styles.content_tool}>
      <div className="row d-flex mb-4 justify-content-between align-items-center" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <div className="col-6 offset-2">
          <div onClick={() => showTool()} className={styles.toolTextContainer}>
            <p className="text-md mb-0">{herramienta.objetivo}</p>
            <span className="text--theme-secondary text-sm">{herramienta.nombre}</span>
          </div>
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
              VIP{' '}<span className="icon text--theme-light">R</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccordionCollapse;
