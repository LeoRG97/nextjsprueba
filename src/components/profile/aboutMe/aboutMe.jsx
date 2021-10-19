import { Fragment } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import LoadingIndicator from '@/components/loadingIndicator/LoadingIndicator';
import styles from './aboutme.module.css';

const AboutMeComponent = () => {
  const { data: userData, fetched } = useSelector((state) => state.profile);

  const renderElement = (socialType) => {
    switch (socialType.nombre) {
      case 'twitter':
        return (
          <a href={socialType.link} target="_blank" rel="noreferrer" className={styles.socialLink}>
            <li className="text-sm icon-md">
              X
            </li>
          </a>
        );
      case 'linkedIn':
        return (
          <a href={socialType.link} target="_blank" rel="noreferrer" className={styles.socialLink}>
            <li className="text-sm icon-md">
              M
            </li>
          </a>
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

  return (
    <Container className="content-n-p">
      <Row>
        {
          (!fetched) ? (
            <Col>
              <div className={styles.content_loading}>
                <LoadingIndicator />
              </div>
            </Col>
          ) : (
            <>
              <Col xl="4" lg="4" sm="4">
                <p className="title">Profesional</p>
                <span className="text-md d-block">{userData.position}</span>
                <small className="text-sm">{userData.company}</small>
                <p className="title mt-4 mb-0">Social</p>
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
              <Col xl="8" lg="8" sm="8">
                {userData.biography && (
                  <div className="mb-4">
                    <p className="title">Biografía</p>
                    <p className="text-md">{userData.biography}</p>
                  </div>
                )}
                <p className="title">Intereses</p>
                <ul className={styles.content_ul}>
                  {
                    userData.preferences.map((item) => (
                      <Fragment key={generateKey()}>
                        <li className={`text-sm text--theme-light ${styles.listItem}`}>{item.nombre}</li>
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
