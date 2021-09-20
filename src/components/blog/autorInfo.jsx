/* eslint-disable react/no-danger */
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import Image from 'next/image';
import { Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './blog.module.css';

const AutorComponent = ({
  autor, dateBlog, onLike, liked, likes, cssSaved, quitSaved, saveArt,
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
      <Row>
        <Col xl="6" lg="6" sm="12" className="col-12">
          <Row>
            <Col className="col-2 ">
              <Image height="45" width="45" objectFit="contain" src={autor.picture} />
            </Col>
            <Col className="col content-n-p ">
              <h3 className="text-md">{autor.autor}</h3>
              <label className="text-sm">{converDate(dateBlog)}</label>
            </Col>
          </Row>
        </Col>
        <Col xl="6" lg="6" sm="12" className="col-12">
          <div className="content-right">
            <button className="Btn-rounded d-i">T</button>
            {
              (cssSaved !== '') ? (
                <button className={`Btn-rounded d-i ${cssSaved}`} title="Guardar" onClick={quitSaved}>U</button>
              ) : (
                <button className={`Btn-rounded d-i ${cssSaved}`} title="Guardar" onClick={saveArt}>U</button>
              )
            }
            <button
              onClick={() => (!liked && onLike())}
              className={`Btn-like ${styles.btn_top} ${liked && 'Btn-like__active'}`}
            >
              <i className={`icon-btn ${liked && 'text--theme-highlight'}`}>c</i>{!liked ? 'Valorar' : likes}
            </button>
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
};

AutorComponent.defaultProps = {
  autor: {},
  dateBlog: '',
  cssSaved: '',
};

export default AutorComponent;
