import React from 'react';
import { Col, Row } from 'react-bootstrap';
import styles from '../courseSpecific.module.css';
import LessonCourse from './LessonCourse';

const UnitCourse = React.memo(({ unit, lessons, suscrito }) => {
  return (
    <Row className="mt-3">
      <Col xs={6}>
        <div className="d-flex align-items-center mb-4">
          <div className={styles.unitIndex}>
            <span className="text-regular text--theme-light">U{unit.numero}</span>
          </div>
          <h2 className="text-md mb-0">{unit.titulo}</h2>
        </div>
      </Col>
      <Col xs={6}>
        {
          lessons.map((lesson) => {
            return (
              <LessonCourse key={lesson._id} lesson={lesson} suscrito={suscrito} />
            );
          })
        }
      </Col>
      <hr className="bg-light" />
    </Row>
  );
});

export default UnitCourse;
