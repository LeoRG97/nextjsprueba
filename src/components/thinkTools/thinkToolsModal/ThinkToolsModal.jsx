import React, { useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { hideToolsModal } from '@/reducers/alert';
import AccordionComponent from '../accordionComponent/AccordionComponent';
import styles from './thinkToolsModal.module.css';

const ThinkToolsModal = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { showTools } = useSelector((state) => state.alert);

  useEffect(() => {
    if (showTools) {
      dispatch(hideToolsModal());
    }
  }, [router]);

  return (
    <>
      <Modal
        show={showTools}
        size="md"
        centered
        onHide={() => dispatch(hideToolsModal())}
      >
        <div className={`container-fluid ${styles.modalInner}`}>
          <h1 className="title-xl text-center py-3">Me gustaría...</h1>
          <div className={styles.accordion}>
            <AccordionComponent />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ThinkToolsModal;
