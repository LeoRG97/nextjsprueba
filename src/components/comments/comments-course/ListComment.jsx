import React from 'react';
import { useSession } from 'next-auth/client';
import useSWRInfinite from 'swr/infinite';
import { useDispatch } from 'react-redux';
import { AddComment } from '../AddComment';
import { fetchData } from '@/services/swr';
import { useForm } from '../hooks/useForm';
import styles from '../comments.module.css';
import { ListItem } from './ListItem';
import { ApiRoutes } from '@/global/constants';
import { addComment } from '@/services/courses';
import { LoadingIndicator } from '@/components';
import { showSubscribeAlert } from '@/reducers/alert';

export const ListComment = React.memo(({ courseId }) => {
  const [session] = useSession();
  const dispatch = useDispatch();

  const { values, handleInputChange, resetForm } = useForm({
    comentario: '',
  });

  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `${ApiRoutes.CoursesComments}/${courseId}?&pageNum=${pageIndex + 1}&pageSize=3&sort=desc`; // API endpoint
  };

  const {
    data, size, setSize, mutate, isValidating,
  } = useSWRInfinite(getKey, fetchData, { revalidateAll: true });

  const isEmpty = data?.[size - 1]?.length === 0;

  const handleSubmitComment = async () => {
    if (values.comentario !== '') {
      const commentData = {
        curso_id: courseId,
        usuario_id: session.user.id,
        comentario: values.comentario,
      };
      await addComment(commentData);
      mutate();
      resetForm();
    }
  };

  return (
    <div className="content-n-p content-blog-autor">
      <ul>

        {
          session?.user && (
            <AddComment
              values={values}
              handleInputChange={handleInputChange}
              fieldName="comentario"
              handleSubmit={handleSubmitComment}
            />
          )
        }
      </ul>

      <ul className={`${styles.commentList}`}>
        {
          data && data.map((page) => {
            return page.map((comment) => (
              <li key={comment._id}>
                <ListItem mutateList={mutate} comment={comment} type="comment" />
              </li>
            ));
          })
        }
      </ul>
      <div className="d-flex justify-content-center">
        <>
          {!isEmpty && (
            isValidating ? (
              <LoadingIndicator />
            )
              : (
                <button
                  className="button button--theme-secondary"
                  onClick={() => {
                    /* eslint-disable no-unused-expressions */
                    session?.user
                      ? setSize(size + 1) : dispatch(showSubscribeAlert());
                  }}
                >
                  Ver más comentarios
                </button>
              )
          )}
        </>
      </div>
    </div>
  );
});
