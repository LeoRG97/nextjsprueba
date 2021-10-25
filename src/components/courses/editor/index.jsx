import React, { useContext, useEffect /* , useState */ } from 'react';
import TooltipContainer from '@/components/articleManager/editorComponents/tooltipContainer/TooltipContainer';
import styles from './courseEditor.module.css';
import { coursesArray } from '../courseOverview/data';
import Units from './units/Units';
import { CourseContext } from '@/helpers/contexts/CourseContext';

const CourseEditor = () => {
  const {
    units,
    lessons,
    setUnits,
    setLessons,
  } = useContext(CourseContext);

  useEffect(() => {
    const data = coursesArray[0];
    if (data) {
      setUnits(data.unidades);
      setLessons(data.lecciones);
    }
  }, [coursesArray]);

  const unitsArray = units.map((unit) => {
    // agrupar las lecciones con sus respectivas unidades (y conservar el orden)
    const data = [];
    lessons.forEach((lesson) => {
      if (lesson.no_unidad === unit.no_unidad) {
        data.push({ ...lesson });
      }
    });
    return { ...unit, lessons: data };
  });

  return (
    <div className={styles.editor}>
      <div className={styles.editorContent}>
        <>
          {unitsArray && (
            <Units
              units={unitsArray}
            />
          )}
        </>
      </div>
      <div className={styles.optionsContainer}>

        <TooltipContainer tooltipText="Publicar" placement="left">
          <div
            className={`icon-button icon-button--primary ${styles.optionsItem}`}
            onClick={() => {}}
          >
            H
          </div>
        </TooltipContainer>

        <TooltipContainer tooltipText="Guardar borrador" placement="left">
          <div
            className={`icon-button icon-button--success ${styles.optionsItem}`}
            onClick={() => {}}
          >
            I
          </div>
        </TooltipContainer>
        <TooltipContainer tooltipText="Vista previa" placement="left">
          <div className={`icon-button icon-button--secondary ${styles.optionsItem}`}>C</div>
        </TooltipContainer>
      </div>
    </div>
  );
};

export default CourseEditor;
