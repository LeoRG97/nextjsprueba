import React from 'react';
import { useSession } from 'next-auth/client';
import useSWRInfinite from 'swr/infinite';
import styles from '../comments.module.css';
// import { useSWRConfig } from 'swr';
import { fetchData } from '@/services/swr';
import { ApiRoutes } from '@/global/constants';
import { ListItem } from './ListItem';
import { addComment } from '@/services/articles';
import { useForm } from './useForm';
import { AddComment } from './AddComment';

export const ListComment = ({ blogInfo }) => {
  const [values, handleInputChange, resetForm] = useForm({
    comentario: '',
  });
  const { comentario } = values;

  const session = useSession();
  // const { mutate: globalMutate } = useSWRConfig();

  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && !previousPageData.length) return null; // reached the end
    return `${ApiRoutes.ArticlesComments}/${blogInfo}?&pageNum=${pageIndex + 1}&pageSize=2&sort=desc`; // API endpoint
  };

  const {
    data, size, setSize,
  } = useSWRInfinite(getKey, fetchData, { revalidateAll: true });

  const isEmpty = data?.[size - 1]?.length === 0;

  const handleSubmitComment = async () => {
    if (comentario !== '') {
      const commentData = {
        articulo_id: blogInfo,
        usuario_id: session[0].user.id,
        comentario,
      };
      await addComment(commentData);
      // mutar objecto de comentarios
      // console.log(rsp)
      resetForm();
    }
  };

  return (
    <div className="content-n-p content-blog-autor">
      <h3 className="title text-center py-2">Comentarios</h3>
      <ul>
        {
          session[0]?.user && (
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
                <ListItem comment={comment} type="comment" />
              </li>
            ));
          })
        }
      </ul>
      <div className="d-flex justify-content-center">
        <>
          {!isEmpty && (
            <button
              className="button button--theme-secondary"
              onClick={() => setSize(size + 1)}
            >
              Ver más comentarios
            </button>
          )}
        </>
      </div>
    </div>
  );
};
