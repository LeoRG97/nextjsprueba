/* eslint-disable react/no-danger */
// import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { AutorComponent } from '@/components';

const BlogComponent = ({
  blogInfo, htmlCode, autorInfo, onLike, cssSaved, quitSaved, saveArt, isLiked, shareArt,
}) => {
  const renderCode = (item) => {
    if (item.type === 'linkVideo') {
      return (
        <div className="content-video">
          <iframe src={item.tag} title="video" />
        </div>
      );
    }
    if (item.type === 'image' || item.type === 'iframeAudio' || item.type === 'iframeVideo') {
      return (<div className="article-content-center" dangerouslySetInnerHTML={{ __html: item.tag }} />);
    }
    return (<div dangerouslySetInnerHTML={{ __html: item.tag }} />);
  };

  return (
    <>
      <Container>
        <div className="">
          <h3 className="title-editor-xl">{blogInfo.portada.titulo}</h3>
          <p className="subtitle-editor">{blogInfo.portada.descripcion}</p>
          <AutorComponent
            autor={autorInfo}
            dateBlog={blogInfo.createdAt}
            onLike={onLike}
            liked={isLiked}
            likes={blogInfo.likes}
            cssSaved={cssSaved}
            quitSaved={quitSaved}
            saveArt={saveArt}
            shareArt={shareArt}
          />
          <div className="article-content">
            {
              (htmlCode.length !== 0) ? (
                htmlCode.map((item) => {
                  return (
                    <div key={item.id}>
                      {renderCode(item)}
                    </div>
                  );
                })) : (<></>)
            }
          </div>
          <div className="content-btns-last">
            <label className="text-md">Ver en</label>
            <button className="Btn-square d-i">P</button>
            <button className="Btn-square d-i">S</button>
            <button className="Btn-square d-i">N</button>
          </div>
          <AutorComponent
            autor={autorInfo}
            dateBlog={blogInfo.createdAt}
            onLike={onLike}
            liked={isLiked}
            likes={blogInfo.likes}
            cssSaved={cssSaved}
            quitSaved={quitSaved}
            saveArt={saveArt}
            shareArt={shareArt}
          />
        </div>
      </Container>
    </>
  );
};

BlogComponent.propTypes = {
  blogInfo: PropTypes.shape(),
  // eslint-disable-next-line react/forbid-prop-types
  htmlCode: PropTypes.array,
  autorInfo: PropTypes.shape(),
  cssSaved: PropTypes.string,
  quitSaved: PropTypes.func.isRequired,
  saveArt: PropTypes.func.isRequired,
  shareArt: PropTypes.func.isRequired,
};

BlogComponent.defaultProps = {
  blogInfo: {},
  htmlCode: {},
  autorInfo: {},
  cssSaved: '',
};

export default BlogComponent;
