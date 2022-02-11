import React from 'react';
import { useRouter } from 'next/router';
import { ArticleListSelectComponent, TooltipContainer } from '@/components';

const TrendingPageFilters = () => {
  const router = useRouter();

  const handleOrderChange = (item) => {
    const { query, pathname } = router;
    router.push({
      pathname,
      query: { ...query, sort: item.value },
    }, undefined, { scroll: false, shallow: true });
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
    <div className="selects-container">
      <div className="select-recent">
        <ArticleListSelectComponent
          defaultTitle="Más recientes"
          currentValue={query.sort}
          onChange={handleOrderChange}
          selectN="1"
          items={[
            { label: 'Más recientes', value: 'desc' },
            { label: query.type === 'Cursos' ? 'Más antiguos' : 'Más antiguas', value: 'asc' },
          ]}
        />
      </div>
      <div className="select-filter">
        <TooltipContainer
          placement="top"
          tooltipText="Filtrar por tipo de entrada"
        >
          <div>
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
                { label: 'Reportes', value: 'Reporte' },
                { label: 'Cursos', value: 'Cursos' },
              ]}
            />
          </div>
        </TooltipContainer>
      </div>
    </div>
  );
};

export default TrendingPageFilters;
