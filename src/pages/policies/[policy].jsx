import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import {
  Footer,
  Layout,
  Cookies,
  Privacy,
  Legal,
} from '@/components';

export default function PrivacyPolicies({ policy }) {
  return (
    <Layout>
      <main>
        <div className="policies-container">
          <Container fluid>
            <Row>
              <Col xl="12" md="12">
                <div className="policies-nav">
                  <Link href="/policies/privacy" passHref>
                    <a className={`policies-title subtitle ${policy === 'privacy' && 'text--theme-light'}`}>
                      Aviso de privacidad
                    </a>
                  </Link>
                  <Link href="/policies/cookies" passHref>
                    <a className={`policies-title subtitle ${policy === 'cookies' && 'text--theme-light'}`}>
                      Política de cookies
                    </a>
                  </Link>
                  <Link href="/policies/legal" passHref>
                    <a className={`policies-title subtitle ${policy === 'legal' && 'text--theme-light'}`}>
                      Aviso Legal y Condiciones de Uso
                    </a>
                  </Link>
                </div>
              </Col>
            </Row>
            {policy === 'privacy' ? <Privacy /> : <div />}
            {policy === 'cookies' ? <Cookies /> : <div />}
            {policy === 'legal' ? <Legal /> : <div />}
          </Container>
        </div>
      </main>
      <Footer />
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = [
    { params: { policy: 'privacy' } },
    { params: { policy: 'cookies' } },
    { params: { policy: 'legal' } },
  ];
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { policy } = params;
  return {
    props: {
      policy,
    },
  };
}
