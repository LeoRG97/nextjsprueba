/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import ArticlesDetailComponent from './articleDetall';

const ArticlesListComponent = ({ articles }) => {
  return (
    <div>
      {articles.map((article) => {
        return (
          <ArticlesDetailComponent
            key={article._id}
            article={article}
            classContent=""
          />
        );
      })}
    </div>
  );
};

export default ArticlesListComponent;
