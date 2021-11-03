import React, { useEffect, useState } from 'react';
import { Accordion } from 'react-bootstrap';
import useSWR from 'swr';
import CardAccordionComponent from './CardAccordionComponent';
import styles from './accordion.module.css';
import { ApiRoutes } from '@/global/constants';
import { fetchData } from '@/services/swr';
import { LoadingIndicator } from '@/components';

const AccordionComponent = ({
  isEditable, isModalClose,
}) => {
  const [accordionData, setAccordionData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: categories } = useSWR(ApiRoutes.ToolsCategories, fetchData);
  const { data: tools, mutate } = useSWR(ApiRoutes.Tools, fetchData);

  useEffect(() => {
    if (categories && tools) {
      const newArray = categories.data.map((cat) => {
        const categoryTools = tools.data.filter((item) => item.categoria_id === cat._id);
        return {
          ...cat,
          herramientasCategoria: categoryTools,
        };
      });
      setAccordionData(newArray);
      setLoading(false);
    }
  }, [categories, tools]);

  return (
    <div>
      <div className="row justify-content-center">
        {loading ? <LoadingIndicator /> : (
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
                            mutate={mutate}
                            isModalClose={isModalClose}
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
        )}
      </div>
    </div>
  );
};

export default AccordionComponent;
