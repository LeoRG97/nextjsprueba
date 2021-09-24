import React from 'react';
import { Accordion } from 'react-bootstrap';
import CardAccordionComponent from './CardAccordionComponent';
import styles from './accordion.module.css';

const AccordionComponent = () => {
  const data = [
    {
      categoria: 'Obtener datos de mis clientes',
      categoriaIcono: 'e',
      herramientasCategoria: [
        {
          _id: 'aa',
          name: 'Aprendiendo de mis experiencias',
          tipo: 'Tour de experiencias',
        },
        {
          _id: 'bb',
          name: 'Desglosando un tema complejo',
          tipo: 'Diagrama de causas',
        },
      ],
    },
    {
      categoria: 'Aclarar mis prioridades',
      categoriaIcono: 'f',
      herramientasCategoria: [
        {
          _id: 'cc',
          name: 'Aprendiendo de mis experiencias',
          tipo: 'Tour de experiencias',
        },
        {
          _id: 'dd',
          name: 'Desglosando un tema complejo',
          tipo: 'Diagrama de causas',
        },
      ],
    },
  ];
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12">
          <Accordion className={styles.accordion_container}>
            {
              data ? (
                <>
                  {
                    data.map((card, index) => {
                      return (
                        <CardAccordionComponent key={card.categoria} number={index} data={card} />
                      );
                    })
                  }
                </>
              ) : (
                <></>
              )
            }
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default AccordionComponent;
