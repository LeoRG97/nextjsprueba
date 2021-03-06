import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Col, Container, Row } from 'react-bootstrap';
import dynamic from 'next/dynamic';
import { fetch as fetchProfile } from '@/reducers/profile';
import {
  Layout, ProfileNavComponent, MailPasswdComponent,
} from '@/components';
import FormGeneral from '@/components/profile/profileSettings/FormGeneral';
import DataAndPreferencesForm from '@/components/profile/profileSettings/DataAndPreferencesForm';
import RedesSocialesForm from '@/components/profile/profileSettings/RedesSocialesForm';
import { getPreferencesService } from '@/services/preferences';
import withAuth from '@/helpers/withAuth';

const Footer = dynamic(() => import('@/components/footer/Footer'));
const EditProfile = ({ preferences }) => {
  const dispatch = useDispatch();
  const { data, fetched } = useSelector((state) => state.profile);
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchProfile());
    }
  }, []);

  return (
    <Layout>
      <Container className="mb-lg-5">
        <Row className="justify-content-md-center mt-xxl-5">
          <Col className="title-xl mt-xxl-5 mt-lg-title m-title-xl" md="auto">
            Ajustes de la cuenta
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={12} lg={2}>
            <ProfileNavComponent />
          </Col>
          {
            data.name !== undefined ? (
              <Col md={12} lg={5}>
                {
                  query.option === 'general'
                  && (
                    <FormGeneral
                      id={data._id}
                      nameU={data.name}
                      lastName={data.apellidos}
                      userBio={data.biography}
                      pictureU={data.picture}
                    />
                  )
                }
                {
                  query.option === 'data-and-preferences'
                  && (
                    <DataAndPreferencesForm
                      data={data}
                      companydta={data.company}
                      preferences={preferences}
                    />
                  )
                }
                {query.option === 'email-and-pasword' && <MailPasswdComponent />}
                {
                  query.option === 'social-network'
                  && (
                    <RedesSocialesForm
                      data={data}
                    />
                  )
                }
              </Col>
            ) : (
              <Col md={12} lg={6} align="left" />
            )
          }
        </Row>
      </Container>
      <Footer />
    </Layout>
  );
};

export async function getServerSideProps() {
  const { data: preferences } = await getPreferencesService();
  return {
    props: {
      preferences,
    },
  };
}

export default withAuth(EditProfile);
