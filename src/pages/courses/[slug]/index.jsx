import React from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import {
  CourseSpecific, Layout, LoadingIndicator,
} from '@/components';
import { ApiRoutes } from '@/global/constants';
import { fetchCoursesSSR, getCourseBySlug } from '@/services/courses';

const Footer = dynamic(() => import('@/components/footer/Footer'));

const CoursePage = ({ courseInfo }) => {
  const router = useRouter();

  return (
    <Layout>
      <main>
        {
          router.isFallback && (
            <Layout className="d-flex justify-content-center align-items-center">
              <LoadingIndicator />
            </Layout>
          )
        }
        {
          courseInfo ? (
            <CourseSpecific
              course={courseInfo}
            />
          ) : (
            <Layout className="d-flex justify-content-center align-items-center">
              <h1 className="title">Curso no encontrado</h1>
            </Layout>
          )
        }
      </main>
      <Footer />
    </Layout>
  );
};

export async function getStaticPaths() {
  const res = await fetchCoursesSSR(ApiRoutes.Cursos);

  const paths = res.data.map((curso) => {
    return { params: { slug: curso.slug } };
  });

  return {
    paths,
    fallback: true,
  };
}

// getStaticProps & revalidate
export async function getStaticProps({ params }) {
  const courseInfo = await getCourseBySlug(params.slug);

  if (courseInfo && courseInfo.length > 0) {
    return {
      props: {
        courseInfo: courseInfo[0] || null,
      },
      revalidate: 60,
    };
  }

  return { notFound: true };
}

export default CoursePage;
