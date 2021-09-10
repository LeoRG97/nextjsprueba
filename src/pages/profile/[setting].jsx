import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Footer, Layout, ProfileArticles, ProfileHeader, ProfileMenu, RatedArticles,
} from '@/components';
import withAuth from '@/helpers/withAuth';
import { fetch as fetchProfile } from '@/reducers/profile';

const ProfileScreen = () => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const { data, fetched } = useSelector((state) => state.profile);

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchProfile());
    }
  }, []);

  return (
    <Layout>
      <ProfileHeader
        picture={data && data.picture}
        name={data && data.name}
        country={data && data.country}
        state={data && data.state}
      />
      <div className="container">
        <ProfileMenu />

        {query.setting === 'articles' && <ProfileArticles />}
        {query.setting === 'library' && <h1 className="title">Biblioteca</h1>}
        {query.setting === 'ratings' && <RatedArticles />}
        {query.setting === 'about-me' && <h1 className="title">Sobre mí</h1>}

      </div>
      <Footer />
    </Layout>
  );
};

export default withAuth(ProfileScreen);
