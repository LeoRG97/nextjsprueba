import { Container, Row, Col } from 'react-bootstrap';
import styles from '../courseSpecific.module.css';

const AutorCourseComponent = ({
  suscrito, handleSubscribe, handleLesson,
}) => {
  return (
    <Container className="content-n-p content-blog-autor mt-3">
      <Row className="m-0">
        <Col className="col-12" xl="6" lg="6">
          {/* <Row>
            <Image
              width="45"
              height="45"
              layout="fixed"
              src={autor.picture}
              className={styles.author_pict}
            />
            <Col>
              <label className="text-sm">Un curso de </label>
              <h3 className="text-md">{autor.name} {autor.apellidos}</h3>
            </Col>
          </Row> */}
        </Col>
        <Col xl="6" lg="6" sm="12" className="col-12 p-0">
          <div className={styles.buttonsContainer}>
            {
              suscrito ? (
                <button className="button button--theme-light me-2" onClick={handleLesson()}>
                  <span className="button__icon-left">F</span>{' '}Continuar viendo
                </button>
              ) : (
                <button
                  onClick={handleSubscribe}
                  className="button button--theme-primary me-2"
                >
                  Inscribirme al curso
                </button>
              )
            }
          </div>
        </Col>
      </Row>
    </Container>
  );
};

AutorCourseComponent.propTypes = {
  // autor: PropTypes.shape(),
};

AutorCourseComponent.defaultProps = {
  autor: {},
};

export default AutorCourseComponent;
