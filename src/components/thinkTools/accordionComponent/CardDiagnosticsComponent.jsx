import React from 'react';
import { Card } from 'react-bootstrap';
import styles from './accordion.module.css';
import AccordionCollapse from './AccordionCollapse';

const CardDiagnosticsComponent = ({ data, onDelete, isEditable }) => {
  return (
    <Card className={styles.card_container}>
      <Card.Body className={styles.card_body}>
        {
          data && data.map((category) => {
            return category.herramientasCategoria.map((herramienta) => (
              <AccordionCollapse
                key={herramienta._id}
                herramienta={herramienta}
                isEditable={isEditable}
                onDelete={onDelete}
                type="diagnostic"
              />
            ));
          })
        }
      </Card.Body>
    </Card>
  );
};

export default CardDiagnosticsComponent;
