import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import Image from 'next/image';
import ContextAwareToggle from './ContextAwareToggle';
import styles from './accordion.module.css';
import AccordionCollapse from './AccordionCollapse';

const CardAccordionComponent = ({
  data, number, isEditable, onDelete,
}) => {
  return (
    <Card className={styles.card_container}>
      <Card.Header className={styles.card_title}>
        <div className="row align-items-center">
          <div className="col-2 col-lg-2 ">
            <div className={styles.icon_container}>
              <Image
                loading="lazy"
                src={data.imagen}
                alt={data.imagen ? data.imagen.split('icons/')[1] : ''}
                className={styles.icon_card}
                layout="intrinsic"
                width={24}
                height={24}
              />
            </div>
          </div>
          <div className="col-8 col-lg-5 title">
            <h2 className="title mb-0">{data.nombre}</h2>
          </div>
          <div className="col-2 offset-lg-3 col-lg-2 d-flex justify-content-end">
            <ContextAwareToggle eventKey={number.toString()} />
          </div>
        </div>
      </Card.Header>
      <Accordion.Collapse eventKey={number.toString()}>
        <Card.Body className={styles.card_body}>
          {
            data.herramientasCategoria.map((herramienta) => {
              return (
                <AccordionCollapse
                  key={herramienta._id}
                  herramienta={herramienta}
                  isEditable={isEditable}
                  onDelete={onDelete}
                  type="tool"
                />
              );
            })
          }
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

export default CardAccordionComponent;
