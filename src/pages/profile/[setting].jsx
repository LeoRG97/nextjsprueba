import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Footer, Layout, ProfileHeader, ProfileMenu, AboutMeComponent, ProfileArticles,
  RatedArticles, ProfileSavedArts, ProfileTools, ProfileForums,
} from '@/components';

import withAuth from '@/helpers/withAuth';
import { fetch as fetchProfile } from '@/reducers/profile';
import ProfileMembersAndInvitations from '@/components/profile/profileMembersAndInvitation/ProfileMembersAndInvitations';
import ProfileNotes from '@/components/profile/profileNotes/ProfileNotes';

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
        lastName={data && data.apellidos}
        country={data && data.country}
        state={data && data.state}
      />
      <div className="container">
        <ProfileMenu />

        {query.setting === 'articles' && <ProfileArticles estado="publicado" />}
        {query.setting === 'drafts' && <ProfileArticles estado="borrador" />}
        {query.setting === 'members-and-invitations' && <ProfileMembersAndInvitations />}
        {query.setting === 'library' && <ProfileSavedArts />}
        {query.setting === 'about-me' && <AboutMeComponent />}
        {query.setting === 'ratings' && <RatedArticles />}
        {query.setting === 'notes' && <ProfileNotes />}
        {query.setting === 'tools' && <ProfileTools />}
        {query.setting === 'forums' && <ProfileForums />}

      </div>
      <Footer />
    </Layout>
  );
};

export default withAuth(ProfileScreen);
