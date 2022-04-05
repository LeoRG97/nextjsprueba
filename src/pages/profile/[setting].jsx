import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import dynamic from 'next/dynamic';
import {
  Layout,
  ProfileHeader,
  ProfileMenu,
  AboutMeComponent,
} from '@/components';

import withAuth from '@/helpers/withAuth';
import { fetch as fetchProfile } from '@/reducers/profile';

const Footer = dynamic(() => import('@/components/footer/Footer'));
const ProfileArticles = dynamic(() => import('@/components/profile/profileArticles/ProfileArticles'));
const RatedArticles = dynamic(() => import('@/components/profile/ratedArticles/RatedArticles'));
const ProfileSavedArts = dynamic(() => import('@/components/profile/profileMySavedArts/profileSavedArts'));
const ProfileNotes = dynamic(() => import('@/components/profile/profileNotes/ProfileNotes'));
const ProfileTools = dynamic(() => import('@/components/profile/profileTools/ProfileTools'));
const ProfileForums = dynamic(() => import('@/components/profile/profileForums/ProfileForums'));
const ProfileCourses = dynamic(() => import('@/components/profile/profileCourses/ProfileCourses'));
const ProfileCourseSubscription = dynamic(() => import('@/components/profile/profileCourses/ProfileCourseSubscription'));
const ProfileMembersAndInvitations = dynamic(() => import('@/components/profile/profileMembersAndInvitation/ProfileMembersAndInvitations'));

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
        {query.setting === 'tools' && <ProfileTools option="tool" />}
        {query.setting === 'diagnostics' && <ProfileTools option="diagnostic" />}
        {query.setting === 'courses' && <ProfileCourses estado="publicado" />}
        {query.setting === 'courses-drafts' && <ProfileCourses estado="borrador" />}
        {query.setting === 'subscriptions' && <ProfileCourseSubscription />}
        {query.setting === 'forums' && <ProfileForums />}

      </div>
      <Footer />
    </Layout>
  );
};

export default withAuth(ProfileScreen);
