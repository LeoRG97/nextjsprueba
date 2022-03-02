import { Container, Row, Col } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import {
  Footer, Layout, ToolsContent,
} from '@/components';
import { ApiRoutes } from '@/global/constants';
import { fetchData } from '@/services/swr';
import { fetchToolBySlug, fetchToolsContent } from '@/services/tools';
import DiagnosticStartedComponent from '@/components/thinkTools/diagnostic/DiagnosticStartedComponent';

const DiagnosticSlugPage = ({ toolsInfo, toolsCode }) => {
  const { query } = useRouter();
  const [session] = useSession();

  return (
    <Layout>
      {
        toolsInfo && toolsCode && (
          query.diagnostic
            ? (
              <>
                {
                  session && session.user && (
                    <DiagnosticStartedComponent
                      toolsInfo={toolsInfo}
                      userId={session.user.id}
                    />
                  )
                }
              </>
            )
            : (<><ToolsContent toolsInfo={toolsInfo} toolsCode={toolsCode} /><Footer /></>)
        )
      }
      {
        !toolsInfo && (
          <>
            <Container>
              <Row className="container_top_">
                <Col>
                  <h3 className="title">Herramienta no encontrada</h3>
                </Col>
              </Row>
            </Container>
            <Footer />
          </>
        )
      }
    </Layout>
  );
};

// getStaticPaths
export async function getStaticPaths() {
  const res = await fetchData(ApiRoutes.Tools);
  const paths = res.data.map((tools) => {
    return { params: { slug: tools.slug } };
  });

  return {
    paths,
    fallback: true,
  };
}

// getStaticProps & revalidate
export async function getStaticProps({ params }) {
  const toolsInfo = await fetchToolBySlug(params.slug);

  if (toolsInfo && toolsInfo.length > 0) {
    if (toolsInfo[0]) {
      const toolsCode = await fetchToolsContent(toolsInfo[0]._id);
      return {
        props: {
          toolsInfo: toolsInfo[0] || null,
          toolsCode: toolsCode.data || toolsCode || null,
        },
        revalidate: 60,
      };
    }
    const toolsCode = await fetchToolsContent(toolsInfo._id);
    return {
      props: {
        toolsInfo: toolsInfo || null,
        toolsCode: toolsCode.data || toolsCode || null,
      },
      revalidate: 60,
    };
  }

  return { notFound: true };
}

export default DiagnosticSlugPage;
