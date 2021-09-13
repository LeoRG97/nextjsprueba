import { useState, useEffect, Fragment } from 'react';
import { useSession } from 'next-auth/client';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import { getProfile } from '@/services/profile';
import LoadingIndicator from '@/components/loadingIndicator/LoadingIndicator';
import styles from './aboutme.module.css';

const AboutMeComponent = () => {
  const [session] = useSession();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true);

  const renderElement = (socialType) => {
    switch (socialType.nombre) {
      case 'twitter':
        return (
          <Link href={socialType.link} passHref>
            <a>
              <li className="text-sm icon">
                M
              </li>
            </a>
          </Link>
        );
      case 'facebook':
        return (
          <Link href={socialType.link} passHref>
            <a>
              <li className="text-sm icon">
                M
              </li>
            </a>
          </Link>
        );
      case 'linkedin':
        return (
          <Link href={socialType.link} passHref>
            <a>
              <li className="text-sm icon">
                M
              </li>
            </a>
          </Link>
        );
      default:
        return <></>;
    }
  };
  const generateKey = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = 10;
    for (let i = 0; i < 10; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  useEffect(() => {
    let userInfo = {
      position: '',
      enterprise: '',
      socialMedia: [],
      biography: '',
      preferences: [],
    };
    if (session !== undefined) {
      if (session.user) {
        if (session.user.id) {
          getProfile(session.user.id).then((resp) => {
            userInfo = {
              position: resp.position,
              enterprise: resp.company,
              socialMedia: resp.socialMedia,
              biography: resp.biography,
              preferences: resp.preferences,
            };
            setUserData(userInfo);
            setLoading(false);
          });
        }
      }
    } else {
      setUserData(userInfo);
    }
  }, [session]);

  return (
    <Container className="content-n-p">
      <Row>
        {
          (loading) ? (
            <Col>
              <div className={styles.content_loading}>
                <LoadingIndicator />
              </div>
            </Col>
          ) : (
            <>
              <Col xl="4" lg="4" sm="4" className="col-12">
                <p className="title">Profesional</p>
                <p className="text-md">{userData.position}</p>
                <p className="text-sm">{userData.enterprise}</p>
                <p className="title">Social</p>
                <ul className={`${styles.content_ul} ${styles.social}`}>
                  {
                    userData.socialMedia.map((item) => (
                      <Fragment key={generateKey()}>
                        {renderElement(item)}
                      </Fragment>
                    ))
                  }
                </ul>
              </Col>
              <Col xl="8" lg="8" sm="8" className="col-12">
                <p className="title">Biografía</p>
                <p className="text-md">{userData.biography}</p>
                <p className="title">Intereses</p>
                <ul className={styles.content_ul}>
                  {
                    userData.preferences.map((item) => (
                      <Fragment key={generateKey()}>
                        <li className="text-sm">{item.nombre}</li>
                      </Fragment>
                    ))
                  }
                </ul>
              </Col>
            </>
          )
        }
      </Row>
    </Container>
  );
};

export default AboutMeComponent;
