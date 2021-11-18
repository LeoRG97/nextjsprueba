import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { CourseEditor, Layout, LoadingIndicator } from '@/components';
import CourseContextProvider from '@/helpers/contexts/CourseContext';
import withAuth from '@/helpers/withAuth';
import { fetchCourseById } from '@/services/courses';
import { Roles } from '@/global/constants';

const CourseEditorPage = () => {
  const router = useRouter();
  const { data } = router.query;
  const [initialData, setInitialData] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(data && data[0]);

  const getCourse = async (id) => {
    const res = await fetchCourseById(id);
    if (res.ok) {
      const course = res.data[0];
      setInitialData(course);
    } else {
      setError('No se encontró el curso');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (data && data[0]) {
      getCourse(data[0]);
    }
  }, []);

  const showContent = () => {
    if (loading) {
      return <div className="centered-content mt-5 pt-5"><LoadingIndicator /></div>;
    }
    if (error) {
      return <h3 className="text-center title mt-5 pt-5">{error}</h3>;
    }

    return (
      <CourseEditor initialData={initialData} />
    );
  };

  return (
    <Layout>
      <CourseContextProvider>
        {showContent()}
      </CourseContextProvider>
    </Layout>
  );
};

export default withAuth(CourseEditorPage, [Roles.Admin, Roles.Author, Roles.Reviewer]);
