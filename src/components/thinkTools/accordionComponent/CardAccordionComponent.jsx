import React from 'react';
import { Accordion, Card } from 'react-bootstrap';
import ContextAwareToggle from './ContextAwareToggle';
import styles from './accordion.module.css';
import AccordionCollapse from './AccordionCollapse';

const CardAccordionComponent = ({ data, number }) => {
  return (
    <Card className={styles.card_container}>
      <Card.Header className={styles.card_title}>
        <div className="row align-items-center">
          <div className="col-3 col-md-2 ">
            <div className={styles.icon_container}>
              <span className={`icon-md ${styles.icon_card}`}>{data.categoriaIcono}</span>
            </div>
          </div>
          <div className="col-7 col-md-7 title">
            <span>{data.categoria}</span>
          </div>
          <div className="col-2 offset-md-1 col-md-2 justify-content-end">
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
