/* eslint-disable react/no-danger */
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import Image from 'next/image';
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './blog.module.css';
import { TooltipContainer } from '@/components';

const AutorComponent = ({
  autor, dateBlog, onLike, liked, likes, cssSaved, quitSaved, saveArt, shareArt,
}) => {
  const converDate = (date) => {
    const dateFormat = new Date(date);
    let formattedDate = Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    }).format(dateFormat);
    formattedDate = formattedDate.toString();
    formattedDate = formattedDate.replace('January', 'Enero');
    formattedDate = formattedDate.replace('February', 'Febrero');
    formattedDate = formattedDate.replace('March', 'Marzo');
    formattedDate = formattedDate.replace('April', 'Abril');
    formattedDate = formattedDate.replace('May', 'Mayo');
    formattedDate = formattedDate.replace('June', 'Junio');
    formattedDate = formattedDate.replace('July', 'Julio');
    formattedDate = formattedDate.replace('August', 'Agosto');
    formattedDate = formattedDate.replace('September', 'Septiembre');
    formattedDate = formattedDate.replace('October', 'Octubre');
    formattedDate = formattedDate.replace('November', 'Noviembre');
    formattedDate = formattedDate.replace('December', 'Diciembre');
    return formattedDate;
  };

  return (
    <Container className="content-n-p content-blog-autor">
      <Row className="m-0">
        <Col className="col-12" xl="6" lg="6">
          <Row>
            <Image
              width="45"
              height="45"
              layout="fixed"
              src={autor.picture}
              className={styles.author_pict}
            />
            <Col>
              <h3 className="text-md">{autor.autor}</h3>
              <label className="text-sm">{converDate(dateBlog)}</label>
            </Col>
          </Row>
        </Col>
        <Col xl="6" lg="6" sm="12" className="col-12 p-0">
          <div className={styles.buttonsContainer}>
            <TooltipContainer placement="top" tooltipText="Compartir">
              <button className="icon-button icon-button--secondary m-2" onClick={shareArt}>T</button>
            </TooltipContainer>
            {
              (cssSaved !== '') ? (
                <TooltipContainer placement="top" tooltipText="Guardar">
                  <button className={`icon-button icon-button--secondary m-2 ${cssSaved}`} onClick={quitSaved}>U</button>
                </TooltipContainer>
              ) : (
                <TooltipContainer placement="top" tooltipText="Guardar">
                  <button className={`icon-button icon-button--secondary m-2 ${cssSaved}`} onClick={saveArt}>U</button>
                </TooltipContainer>
              )
            }
            <TooltipContainer placement="top" tooltipText="Valorar">
              <button
                onClick={() => (!liked && onLike())}
                className={`Btn-like m-2 ${styles.btn_top} ${liked && 'Btn-like__active'}`}
              >
                <i className={`icon-btn ${liked && 'text--theme-highlight'}`}>c</i>{!liked ? 'Valorar' : likes}
              </button>
            </TooltipContainer>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

AutorComponent.propTypes = {
  autor: PropTypes.shape(),
  dateBlog: PropTypes.string,
  cssSaved: PropTypes.string,
  quitSaved: PropTypes.func.isRequired,
  saveArt: PropTypes.func.isRequired,
  shareArt: PropTypes.func.isRequired,
};

AutorComponent.defaultProps = {
  autor: {},
  dateBlog: '',
  cssSaved: '',
};

export default AutorComponent;
