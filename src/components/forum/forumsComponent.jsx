/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import useSWR from 'swr';
import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { fetchData } from '@/services/swr';
import { BUCKET_URL, ApiRoutes } from '@/global/constants';
import styles from './forums.module.css';
import ForumModal from './forumEditor/ForumEditor';

const ForumsComponent = ({
  showOptions, showSubs,
}) => {
  const [showModal, setShowModal] = useState(false);
  const { data } = useSWR(
    ApiRoutes.Forums,
    fetchData,
  );

  const setBackground = (url) => {
    let stylleImg = null;
    if (url.includes(BUCKET_URL)) {
      stylleImg = {
        backgroundImage: `url(${url})`,
      };
    } else {
      stylleImg = {
        backgroundImage: `url(${BUCKET_URL}${url})`,
      };
    }
    return stylleImg;
  };

  const subscribeForum = async (idForum) => {
    return idForum;
  };

  const updateForum = async (idForum) => {
    return idForum;
  };

  const deleteForum = async (idForum) => {
    return idForum;
  };

  return (
    <Container>
      {
        showOptions && (
          <div className="d-flex justify-content-center justify-content-lg-end mb-4">
            <button
              className="button button--theme-primary"
              onClick={() => setShowModal(true)}
            >Nuevo foro
            </button>
          </div>
        )
      }
      {
        data && data.data && data.data.map((forum) => {
          return (
            <Row className={styles.forum_row} key={forum._id}>
              <Col xl="6" lg="6" sm="12" className="col-12">
                <div className={styles.forum_info_cont}>
                  <div className={styles.forum_conten_img}>
                    <div style={setBackground(forum.imagen)} className={styles.forum_img}> </div>
                  </div>
                  <div>
                    <div>
                      <h2 className="title">{forum.titulo}</h2>
                    </div>
                    {
                      showSubs && (
                        <div className={styles.forum_btn_cont}>
                          <a href={forum.url} target="_blank" rel="noreferrer">
                            <button className="button button--theme-primary" onClick={() => subscribeForum(forum._id)}>Unirme</button>
                          </a>
                        </div>
                      )
                    }
                    {
                      showOptions && (
                        <div className={styles.forum_drop_cont}>
                          <div className="dropdown More-drop">
                            <div className="dropdown-select More">
                              <button>
                                <span className="icon text--theme-secondary">0</span>
                              </button>
                            </div>
                            <ul className={`select-dropdown ${styles.list_content}`}>
                              <li className="text-sm" onClick={() => updateForum(forum._id)}>
                                <span className="icon text--theme-light">K</span>Modificar
                              </li>
                              <li className="text-sm" onClick={() => deleteForum(forum._id)}>
                                <span className="icon text--theme-light">L</span>Eliminar
                              </li>
                            </ul>
                          </div>
                        </div>
                      )
                    }
                  </div>
                </div>
              </Col>
              <Col xl="6" lg="6" sm="12" className="col-12">
                <p className="text-md">{forum.descripcion}</p>
              </Col>
            </Row>
          );
        })
      }
      <div className={styles.forum_separator}> </div>
      <ForumModal
        show={showModal}
        onClose={() => setShowModal(false)}
      />
    </Container>
  );
};

export default ForumsComponent;
