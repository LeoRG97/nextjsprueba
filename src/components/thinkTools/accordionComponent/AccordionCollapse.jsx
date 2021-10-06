/* eslint-disable no-console */
import { useSession } from 'next-auth/client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { reviewerAccess } from '@/helpers/accessVerifiers';
import { SubscriptionModal } from '@/components';
import OptionDropdown from '@/components/optionsDropdown/OptionsDropdown';
import styles from './accordion.module.css';

const AccordionCollapse = ({ herramienta, isEditable }) => {
  const router = useRouter();
  const [hover, setHover] = useState(false);
  const [session] = useSession();
  const [show, setModal] = useState(false);

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
      eventName: (() => console.log(`delete ${herramienta._id}`)),
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
      </div>
    </div>
  );
};

export default AccordionCollapse;
