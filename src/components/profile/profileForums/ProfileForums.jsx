import React from 'react';
import useSWR from 'swr';
import { ApiRoutes } from '@/global/constants';
import { fetchData } from '@/services/swr';
import ForumsComponent from '@/components/forum/forumsComponent';

const ProfileForums = () => {
  const { data: forums } = useSWR(ApiRoutes.Forums, fetchData, {
    fallbackData: { data: [] },
  });

  return (
    <div className="d-flex justify-content-center">
      <ForumsComponent data={forums.data} showOptions showSubs={false} />
    </div>
  );
};

export default ProfileForums;
