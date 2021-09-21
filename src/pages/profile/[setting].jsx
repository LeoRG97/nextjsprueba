import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Footer, Layout, ProfileHeader, ProfileMenu, AboutMeComponent, ProfileArticles,
  RatedArticles, ProfileSavedArts,
} from '@/components';

import withAuth from '@/helpers/withAuth';
import { fetch as fetchProfile } from '@/reducers/profile';
import ProfileMembersAndInvitations from '@/components/profile/profileMembersAndInvitation/ProfileMembersAndInvitations';

const ProfileScreen = () => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const { data, fetched } = useSelector((state) => state.profile);
  const [artsNumb, setSavedArts] = useState();

  const savedArts = (numb) => {
    setSavedArts(numb);
  };

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchProfile());
    }
  }, [artsNumb]);

  return (
    <Layout>
      <ProfileHeader
        picture={data && data.picture}
        name={data && data.name}
        country={data && data.country}
        state={data && data.state}
      />
      <div className="container">
        <ProfileMenu artsNumb={artsNumb} />

        {query.setting === 'articles' && <ProfileArticles />}
        {query.setting === 'members-and-invitations' && <ProfileMembersAndInvitations />}
        {query.setting === 'library' && <ProfileSavedArts savedArts={savedArts} />}
        {query.setting === 'ratings' && <h1 className="title">Valoraciones</h1>}
        {query.setting === 'about-me' && <AboutMeComponent />}
        {query.setting === 'ratings' && <RatedArticles />}

      </div>
      <Footer />
    </Layout>
  );
};

export default withAuth(ProfileScreen);
