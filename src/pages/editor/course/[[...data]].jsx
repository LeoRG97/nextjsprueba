import React from 'react';
import { CourseEditor, Layout } from '@/components';
import CourseContextProvider from '@/helpers/contexts/CourseContext';

const CourseEditorPage = () => {
  return (
    <CourseContextProvider>
      <Layout>
        <CourseEditor />
      </Layout>
    </CourseContextProvider>
  );
};

export default CourseEditorPage;
