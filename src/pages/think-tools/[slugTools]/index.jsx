import { Container, Row, Col } from 'react-bootstrap';
import {
  Footer, Layout, ToolsContent,
} from '@/components';
import { ApiRoutes } from '@/global/constants';
// import { fetchTools } from '@/services/tools';
import { fetchData } from '@/services/swr';
import { fetchToolBySlug, fetchToolsContent } from '@/services/tools';

const GetTool = ({ toolsInfo, toolsCode }) => {
  return (
    <Layout>
      {
        toolsInfo && toolsCode && (
          <ToolsContent toolsInfo={toolsInfo} toolsCode={toolsCode} />
        )
      }
      {
        !toolsInfo && (
          <Container>
            <Row className="container_top_">
              <Col>
                <h3 className="title">Herramienta no encontrada</h3>
              </Col>
            </Row>
          </Container>
        )
      }
      <Footer />
    </Layout>
  );
};

// getStaticPaths
export async function getStaticPaths() {
  const res = await fetchData(ApiRoutes.Tools);
  const paths = res.data.map((tools) => {
    return { params: { slugTools: tools.slug } };
  });

  return {
    paths,
    fallback: true,
  };
}

// getStaticProps & revalidate
export async function getStaticProps({ params }) {
  const toolsInfo = await fetchToolBySlug(params.slugTools);

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

export default GetTool;
