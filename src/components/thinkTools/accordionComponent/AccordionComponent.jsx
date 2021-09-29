import React from 'react';
import { Accordion } from 'react-bootstrap';

import CardAccordionComponent from './CardAccordionComponent';
import styles from './accordion.module.css';

const AccordionComponent = ({ accordionData, isEditable }) => {
  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-12">
          <Accordion className={styles.accordion_container}>
            {
              accordionData ? (
                <>
                  {
                    accordionData.map((card, index) => {
                      return (
                        <CardAccordionComponent
                          key={card._id}
                          number={index}
                          data={card}
                          isEditable={isEditable}
                        />
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
