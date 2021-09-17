import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import { useSession } from 'next-auth/client';
import { Container, Row } from 'react-bootstrap';
import { fetchData } from '@/services/swr';
import { ApiRoutes } from '@/global/constants';
import {
  ArticlesListComponent, LoadingIndicator,
} from '@/components';

const ProfileSavedArts = ({ savedArts }) => {
  const [pageBlog, setData] = useState(1);
  const [arrayBlog, setArrayData] = useState([]);
  const [initData, setInitData] = useState();

  const [session] = useSession();
  const [routeUri, setURLAPI] = useState(`${ApiRoutes.UserSavedArticles}/${session.user.id}/user?pageSize=9&pageNum=${pageBlog}`);

  const { data } = useSWR(
    [routeUri],
    fetchData,
  );

  const getSavedArts = () => {
    const results = initData;
    if (results) {
      if (results.length > 0) {
        const arrayArt = [];
        // eslint-disable-next-line array-callback-return
        results.map((item) => {
          if (!item.registros) {
            let blogInfo = item.articulo[0];
            blogInfo.likes = item.likes;
            blogInfo = JSON.stringify(blogInfo);
            const addautorInfo = `, "usuario_id": { "slug": "${item.autor[0].slug}", "name": "${item.autor[0].name}", "apellidos": "${item.autor[0].apellidos}" }}`;
            blogInfo = blogInfo.slice(0, -1) + addautorInfo;
            blogInfo = JSON.parse(blogInfo);
            arrayArt.push(blogInfo);
          }
        });
        setArrayData(arrayArt);
      }
    }
    if (data.registros) {
      savedArts(data.registros);
    }
  };

  const moreArts = () => {
    const pagination = pageBlog + 1;
    setURLAPI(`${ApiRoutes.UserSavedArticles}/${session.user.id}/user?pageSize=9&pageNum=${pagination}`);
    setData(pagination);
  };

  useEffect(() => {
    if (data) {
      if (data.data && pageBlog === 1) {
        setInitData(data.data);
      } else if (data.data && pageBlog > 1) {
        setInitData([...initData, ...data.data]);
      }
    }
  }, [data]);

  useEffect(() => {
    if (initData) {
      getSavedArts();
    }
  }, [initData]);

  return (
    <>
      {
        (arrayBlog.length !== 0) ? (
          <>
            <ArticlesListComponent articles={arrayBlog} />
            <Container>
              <Row>
                <div className="content-centered childs">
                  {!data && <LoadingIndicator />}
                  {data && data.data && data.data.length > 1 && (
                    <button
                      className="button button--theme-secondary"
                      onClick={moreArts}
                    >
                      Ver más publicaciones
                    </button>
                  )}
                </div>
              </Row>
            </Container>
          </>
        ) : (<></>)
      }
    </>
  );
};

ProfileSavedArts.propTypes = {
  savedArts: PropTypes.func.isRequired,
};

export default ProfileSavedArts;
