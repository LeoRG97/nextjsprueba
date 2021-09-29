/* eslint-disable no-console */
import { useSession } from 'next-auth/client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { reviewerAccess } from '@/helpers/accessVerifiers';
import { SubscriptionModal } from '@/components';
import DropDownOptions from './DropDownOptions';
import styles from './accordion.module.css';

const AccordionCollapse = ({ herramienta, isEditable }) => {
  const router = useRouter();
  const [hover, setHover] = useState(false);
  const [session] = useSession();
  const [show, setModal] = useState(false);

  const [optionsDropDown] = useState([
    {
      option: 'Modificar',
      event: true,
      eventName: (_id) => router.push(`/editor/tool/${_id}`),
      data: true,
      iconType: 'K',
    },
    {
      option: 'Eliminar',
      event: true,
      eventName: (_id) => console.log(`delete ${_id}`),
      data: true,
      iconType: 'L',
    },
  ]);

  useEffect(() => {}, [session]);

  return (
    <div className="row d-flex mb-2 justify-content-between align-items-center" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="col-6 offset-2">
        {
          (session) ? (
            <Link href="/think-tools" passHref>
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
                <DropDownOptions options={optionsDropDown} data={herramienta} />
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
  );
};

export default AccordionCollapse;
