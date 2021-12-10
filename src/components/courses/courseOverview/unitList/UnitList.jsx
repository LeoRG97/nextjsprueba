/* eslint-disable object-curly-newline */
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSession } from 'next-auth/client';
import { TooltipContainer } from '@/components';
import Unit from './unit/Unit';
import { showSubscribeAlert } from '@/reducers/alert';

const UnitList = React.memo(({
  units, lessons, lessonsRead, onLike, canValue, isLiked, rateTotal,
}) => {
  const [session] = useSession();
  const dispatch = useDispatch();
  return (
    <div>
      {
        units.map((unit) => {
          // eslint-disable-next-line max-len
          const unitLessons = lessons.filter((lesson) => lesson.unidad === unit._id);
          return (
            <Unit
              key={unit.titulo}
              unit={unit}
              lessons={unitLessons}
              lessonsRead={lessonsRead}
            />
          );
        })
      }
      {
        canValue && (
          <Row className="text-md-center text--theme-light">
            <Col md={12}>
              ¿Te ha gustado el contenido de este curso?
            </Col>
            <Col md={12} className="mt-3">
              <TooltipContainer placement="right" tooltipText={!isLiked ? 'Valorar' : 'Quitar valoración'}>
                <button
                  onClick={
                    session?.user
                      ? (() => onLike()) : dispatch(showSubscribeAlert())
                  }
                  className={`Btn-like ${isLiked && 'Btn-like__active m-2'}`}
                >
                  {
                    !isLiked
                      ? (<><i className={`icon-btn ${isLiked && 'text--theme-highlight'}`}>c</i>Valorar</>)
                      : (<><i className={`icon-btn ${isLiked && 'text--theme-highlight'}`}>v</i>{rateTotal}</>)
                  }
                </button>
              </TooltipContainer>
            </Col>
          </Row>
        )
      }
    </div>
  );
});

export default UnitList;
