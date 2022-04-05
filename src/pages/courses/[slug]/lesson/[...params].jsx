import React from 'react';
import { getSession } from 'next-auth/client';
import dynamic from 'next/dynamic';
import { CourseOverview, Layout } from '@/components';
import withAuth from '@/helpers/withAuth';
import { getCourseBySlug } from '@/services/courses';
import { getSubscriptionsUser } from '@/services/subscription';

const Footer = dynamic(() => import('@/components/footer/Footer'));

const CourseLessonPage = ({ courseInfo, subsInfo }) => {
  return (
    <Layout>
      <CourseOverview courseInfo={courseInfo} subsInfo={subsInfo} />
      <Footer />
    </Layout>
  );
};

export async function getServerSideProps({ query, req }) {
  const courseInfo = await getCourseBySlug(query.slug);
  if (courseInfo && courseInfo.length > 0) {
    const session = await getSession({ req });
    const data = {
      curso_id: courseInfo[0]._id,
      usuario_id: session.user.id,
    };
    const subsInfo = await getSubscriptionsUser(data, session.accessToken);

    return {
      props: {
        courseInfo: courseInfo || null,
        subsInfo: subsInfo || null,
      },
    };
  }

  return { notFound: true };
}

export default withAuth(CourseLessonPage);
