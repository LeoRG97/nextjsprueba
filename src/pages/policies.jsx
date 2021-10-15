import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Footer,
  Layout,
  Cookies,
  Privacy,
  Legal,
} from '@/components';

export default function PrivacyPolicies() {
  const [show, setShow] = useState(0);

  const showPrivacy = () => setShow(0);
  const showCookies = () => setShow(1);
  const showLegal = () => setShow(2);

  return (
    <Layout>
      <main>
        <div className="policies-container">
          <Container fluid>
            <Row>
              <Col xl="12" md="12">
                <div className="policies-nav">
                  <div className={show === 0 ? 'policies-title-white subtitle' : 'policies-title subtitle'} onClick={showPrivacy}>
                    Política de privacidad
                  </div>
                  <div className={show === 1 ? 'policies-title-white subtitle' : 'policies-title subtitle'} onClick={showCookies}>
                    Política de cookies
                  </div>
                  <div className={show === 2 ? 'policies-title-white subtitle' : 'policies-title subtitle'} onClick={showLegal}>
                    Política de legal
                  </div>
                </div>
              </Col>
            </Row>
            {show === 0 ? <Privacy /> : <div />}
            {show === 1 ? <Cookies /> : <div />}
            {show === 2 ? <Legal /> : <div />}
          </Container>
        </div>
      </main>
      <Footer />
    </Layout>
  );
}
