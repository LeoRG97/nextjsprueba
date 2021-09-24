/* eslint-disable no-console */
import { useSession } from 'next-auth/client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { reviewerAccess } from '@/helpers/accessVerifiers';
import { SubscriptionModal } from '@/components';
import DropDownOptions from './DropDownOptions';
import styles from './accordion.module.css';

const AccordionCollapse = ({ herramienta }) => {
  const [hover, setHover] = useState(false);
  const [session] = useSession();
  const [show, setModal] = useState(false);

  const [optionsDropDown] = useState([
    {
      option: 'Modificar',
      event: true,
      eventName: (_id) => console.log(`update ${_id}`),
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

  useEffect(() => { }, [session]);

  return (
    <div className="row align-items-center justify-content-end mb-2" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div className="col-8 offset-2  offset-md-2 col-sm-8 col-md-7">
        {
          (session) ? (
            <Link href="/think-tools" passHref>
              <a>
                <div className="text-md">{herramienta.name}</div>
                <div className="text--theme-secondary text-md">{herramienta.tipo}</div>
              </a>
            </Link>
          ) : (
            <div onClick={() => setModal(true)} className={styles.link_tool}>
              <div className="text-md">{herramienta.name}</div>
              <div className="text--theme-secondary text-md">{herramienta.tipo}</div>
            </div>
          )
        }
      </div>
      <div className="col-2 col-sm-2 offset-md-1 col-md-2 justify-content-end">
        {session && (reviewerAccess(session.user.role) && (
          <>
            {
              hover ? (
                <DropDownOptions options={optionsDropDown} data={herramienta} />
              ) : (
                <></>
              )
            }
          </>
        ))}
      </div>
      <SubscriptionModal show={show} setModal={setModal} />
    </div>
  );
};

export default AccordionCollapse;
