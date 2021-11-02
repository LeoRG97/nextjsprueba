import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import useSWRInfinite from 'swr/infinite';
// import { useSWRConfig } from 'swr';
import { fetchData } from '@/services/swr';
import { ApiRoutes } from '@/global/constants';
import styles from '../profileArticles/profile.module.css';
import { ArticleListSelectComponent, CourseDetailComponent, LoadingIndicator } from '@/components';

const ProfileCourses = () => {
  const router = useRouter();
  const [session] = useSession();

  const getKey = (pageIndex, previousPageData) => {
    let params = '';

    if (router.query.type) {
      const { type } = router.query;
      params = `${params}&tipo=${type}`;
    }

    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `${ApiRoutes.CoursesAuthor}/${session.user.id}?pageNum=${pageIndex + 1}&pageSize=9${params}`; // API endpoint
  };

  const {
    data, isValidating, size, setSize,
  } = useSWRInfinite(getKey, fetchData, { revalidateAll: true });

  const isEmpty = data?.[size - 1]?.length === 0;

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

  return (
    <div>
      <div className="selects-container">
        <div className="select-recent">
          <ArticleListSelectComponent
            defaultTitle="Todos"
            currentValue={router.query.type}
            onChange={handleTypeChange}
            selectN="2"
            items={[
              { label: 'Todos', value: '' },
            ]}
          />
        </div>
        <div className={`select-filter ${styles.hideMobile}`}>
          <div
            className={styles.optionsContainer}
          >
            <button className="button button--theme-primary">
              Nuevo curso <span className="button__icon-right text--theme-light">1</span>
            </button>
          </div>
        </div>
      </div>

      {
        data && data.map((page) => {
          return page.map((course) => (
            <CourseDetailComponent
              key={course._id}
              curso={course}
              isAdmin={session.user.role !== 'user'}
            />
          ));
        })
      }
      <div className="d-flex justify-content-center">
        <>
          {isValidating
            ? <LoadingIndicator />
            : !isEmpty && (
              <button
                className="button button--theme-secondary"
                onClick={() => setSize(size + 1)}
              >
                Ver más publicaciones
              </button>
            )}
        </>
      </div>
    </div>
  );
};

export default ProfileCourses;
