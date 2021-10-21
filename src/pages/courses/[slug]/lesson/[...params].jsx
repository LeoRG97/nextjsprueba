import React from 'react';
import { CourseOverview, Footer, Layout } from '@/components';
import withAuth from '@/helpers/withAuth';

const CourseLessonPage = () => {
  return (
    <Layout>
      <CourseOverview />
      <Footer />
    </Layout>
  );
};

export default withAuth(CourseLessonPage);
