import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  ArticleListSelectComponent,
  ArticlesListComponent,
} from '@/components';

const ProfileArticles = () => {
  const router = useRouter();
  useEffect(() => {

  }, [router]);

  const handleOrderChange = (item) => {
    const { query, pathname } = router;
    router.push({
      pathname,
      query: { ...query, sort: item.value },
    }, undefined, { scroll: false });
  };

  const handleTypeChange = (item) => {
    const { query, pathname } = router;
    delete query.type;
    router.push({
      pathname,
      query: {
        ...query,
        ...(item.value && { type: item.value }),
      },
    }, undefined, { scroll: false, shallow: true });
  };

  const { query } = router;

  return (
    <>
      <div className="selects-container">
        <div className="select-recent">
          <ArticleListSelectComponent
            defaultTitle="Más recientes"
            currentValue={query.sort}
            onChange={handleOrderChange}
            selectN="1"
            items={[
              { label: 'Más recientes', value: 'newest-first' },
              { label: 'Más antiguos', value: 'oldest-first' },
            ]}
          />
        </div>
        <div className="select-filter">
          <ArticleListSelectComponent
            defaultTitle="Todos"
            currentValue={query.type}
            onChange={handleTypeChange}
            selectN="2"
            items={[
              { label: 'Todos', value: '' },
              { label: 'Blogs', value: 'Blog' },
              { label: 'Videos', value: 'Video' },
              { label: 'Podcasts', value: 'Podcast' },
            ]}
          />
        </div>
      </div>
      <ArticlesListComponent />
    </>
  );
};

export default ProfileArticles;
