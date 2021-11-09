/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect, useContext } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useSession } from 'next-auth/client';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useRouter } from 'next/router';
import { saveArticle, updateArticle, updateArticleResources } from '@/services/articles';
import { EditorContext } from '@/helpers/contexts/editorContext';
import { upload, remove } from '@/services/aws';
import styles from './editor.module.css';
import DetailsModal from './modals/detailsModal/DetailsModal';
import ModalVideo from './modals/addVideoModal/addVideoModal';
import ModalAudio from './modals/addAudioModal/addAudioModal';
import EditorOptionRender from './editorComponents/renderOptions/renderContainer';
import ToolsComponent from './editorComponents/toolsComponent/tools';
import TooltipContainer from './editorComponents/tooltipContainer/TooltipContainer';
import LoadingIndicatorModal from '../modalsIndicators/LoadingModal';
import SuccessIndicatorModal from '../modalsIndicators/SuccesModal';
import ResourcesModal from './modals/articleResourcesModal/ArticleResourcesModal';
import ErrorIndicatorModal from '../modalsIndicators/ErrorModal';
import EditorPreviewComponent from './articlePreview';
import ModalLink from './modals/addLinkModal/addLinkModal';
import { reduceImageSize } from '@/helpers/images';

const EditorComponent = ({
  option, initialData, setInitialData, initialContent,
}) => {
  const [session] = useSession();
  const router = useRouter();
  const { formData, setFormData } = useContext(EditorContext);
  const [modalShow, setModalShow] = useState(false);
  const [showPublish, setShowPublish] = useState(false);
  const [showResourcesModal, setShowResourcesModal] = useState(false);
  const [modalShowVideo, setModalShowVideo] = useState(false);
  const [arrayItemsEditor, setItems] = useState({});
  const [addedVideo, setContentVideo] = useState(false);
  const [addedAudio, setContentAudio] = useState(false);
  const [editVideo, setEditVideo] = useState({ idContent: '', tagEdit: '', type: '' });
  const [editTag, setEditInfo] = useState({ idContent: '', tagEdit: '', type: '' });
  const [editImg, setEditImg] = useState(false);
  const [updateEvent, setUpdateEvent] = useState(false);
  const [activeOption, setActiveCont] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState(false);
  const [modalShowLink, setModalShowLink] = useState(false);
  const [successData, setSuccessData] = useState({
    show: false,
    title: '',
    message: '',
  });
  const [errorData, setErrorData] = useState({
    show: false,
    title: '',
    message: '',
  });

  const { data: profile } = useSelector((state) => state.profile);

  useEffect(() => {
    if (initialData) {
      const { portada } = initialData;
      setFormData({
        articulo_id: initialData._id,
        titulo: portada && portada.titulo ? portada.titulo : '',
        descripcion: portada && portada.descripcion ? portada.descripcion : '',
        videoUrl: initialData.videoUrl || '',
        categorias: initialData.categorias,
        destacado: initialData.destacado,
        premium: initialData.premium,
        rutaPortada: portada && portada.ruta_imagen ? portada.ruta_imagen : '',
        rutaArticulo: initialData.ruta || '',
      });
    }
  }, [initialData]);

  const makeid = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = 5;
    for (let i = 0; i < 5; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const handleChange = (idContent, e) => {
    // e.persist();
    arrayItemsEditor.html.forEach((item, index) => {
      if (item.id === idContent) {
        // eslint-disable-next-line prefer-const
        let modText = arrayItemsEditor;
        modText.html[index].content = e.target.value;
        switch (modText.html[index].type) {
          case 'textHeader': {
            modText.html[index].tag = `<h1>${e.target.value}</h1>`;
            break;
          }
          case 'textSubHeader': {
            modText.html[index].tag = `<h3>${e.target.value}</h3>`;
            break;
          }
          case 'textParagraph': {
            modText.html[index].tag = `<p>${e.target.value}</p>`;
            break;
          }
          case 'textFooter': {
            modText.html[index].tag = `<small>${e.target.value}</small>`;
            break;
          }
          default: {
            break;
          }
        }
        setItems(modText);
        // localStorage.setItem('contentEditor', JSON.stringify(modText));
      }
    });
  };

  /* Add components functions */

  const addVideoFunct = (tag, embedIframe) => {
    // const EditorContent = localStorage.getItem('contentEditor');
    const obj = { ...arrayItemsEditor };
    const idContainer = makeid();
    if (option === 'onlyVideo') {
      setContentVideo(true);
    }
    if (obj.html.length > 0 && option === 'onlyVideo') {
      const topVideo = { html: [] };
      if (!embedIframe) {
        topVideo.html.push({ id: idContainer, type: 'linkVideo', content: tag, tag });
      } else {
        topVideo.html.push({ id: idContainer, type: 'iframeVideo', content: tag, tag });
      }
      obj.html.forEach((item) => {
        topVideo.html.push(item);
      });
      // localStorage.setItem('contentEditor', JSON.stringify(topVideo));
      setItems(topVideo);
    } else {
      if (!embedIframe) {
        obj.html.push({ id: idContainer, type: 'linkVideo', content: tag, tag });
      } else {
        obj.html.push({ id: idContainer, type: 'iframeVideo', content: tag, tag });
      }
      // localStorage.setItem('contentEditor', JSON.stringify(obj));
      setItems(obj);
    }
    setModalShowVideo(false);
  };

  const addImage = async (event) => {
    event.preventDefault();
    // const EditorContent = localStorage.getItem('contentEditor');
    const obj = { ...arrayItemsEditor };
    const idContainer = makeid();
    if (event.target.files.length > 0) {
      const path = `${profile._id}/resources`;
      const image = event.target.files[0];

      const res = await upload(path, image);
      if (res.ok) {
        obj.html.push({
          id: idContainer,
          type: 'image',
          content: res.file,
          tag: `<img src="${res.file}" alt="">`,
        });
      }
      // localStorage.setItem('contentEditor', JSON.stringify(obj));
      setItems(obj);
    }
  };

  const addTextFunct = (optionText) => {
    // const EditorContent = localStorage.getItem('contentEditor');
    const obj = { ...arrayItemsEditor };
    const idContainer = makeid();
    if (optionText === 'h1') {
      obj.html.push({
        id: idContainer, type: 'textHeader', content: '', tag: '<h1></h1>',
      });
    } else if (optionText === 'h3') {
      obj.html.push({
        id: idContainer, type: 'textSubHeader', content: '', tag: '<h3></h3>',
      });
    } else if (optionText === 'p') {
      obj.html.push({
        id: idContainer, type: 'textParagraph', content: '', tag: '<p></p>',
      });
    } else if (optionText === 'small') {
      obj.html.push({
        id: idContainer, type: 'textFooter', content: '', tag: '<small></small>',
      });
    }
    // localStorage.setItem('contentEditor', JSON.stringify(obj));
    setItems(obj);
  };

  const addAudioFunct = (tag) => {
    // const EditorContent = localStorage.getItem('contentEditor');
    const obj = arrayItemsEditor;
    const idContainer = makeid();
    if (option === 'onlyAudio') {
      setContentAudio(true);
    }
    if (obj.html.length > 0 && option === 'onlyAudio') {
      const topAudio = { html: [] };
      topAudio.html.push({ id: idContainer, type: 'iframeAudio', content: tag, tag });
      obj.html.forEach((item) => {
        topAudio.html.push(item);
      });
      // localStorage.setItem('contentEditor', JSON.stringify(topAudio));
      setItems(topAudio);
    } else {
      obj.html.push({ id: idContainer, type: 'iframeAudio', content: tag, tag });
      // localStorage.setItem('contentEditor', JSON.stringify(obj));
      setItems(obj);
    }
    setModalShow(false);
  };

  const addLinkFunct = (tag) => {
    // const EditorContent = localStorage.getItem('contentEditor');
    const obj = arrayItemsEditor;
    const idContainer = makeid();
    obj.html.push({ id: idContainer, type: 'link', content: tag, tag });
    // localStorage.setItem('contentEditor', JSON.stringify(obj));
    setItems(obj);
    setModalShowLink(false);
  };
  /* ######################### */

  /* Edit components functions */
  const editComponentFunct = (tag, idElement, typeOption) => {
    if (typeOption === 'linkVideo' || typeOption === 'iframeVideo') {
      setModalShowVideo(true);
      setEditVideo({ idContent: idElement, tagEdit: tag, type: typeOption });
      setUpdateEvent(true);
    } else if (typeOption === 'iframeAudio') {
      setModalShow(true);
      setEditInfo({ idContent: idElement, tagEdit: tag, type: typeOption });
      setUpdateEvent(true);
    }
  };

  const updateFunctionEventVideo = (tag, idElement, typeContent) => {
    setUpdateEvent(false);
    setModalShowVideo(false);
    const oldArray = arrayItemsEditor.html;
    let newTag = {};
    if (!typeContent) {
      newTag = { id: idElement, type: 'linkVideo', content: tag, tag };
    } else {
      newTag = { id: idElement, type: 'iframeVideo', content: tag, tag };
    }
    oldArray.forEach((item, index) => {
      if (item.id === idElement) {
        oldArray[index] = newTag;
      }
    });
    // localStorage.setItem('contentEditor', JSON.stringify(arrayItemsEditor));
  };

  const handleChangeImage = async (idElement, content, event) => {
    event.preventDefault();
    const currentContent = content;
    if (event.target.files.length > 0 && currentContent !== '' && currentContent !== 'undefined') {
      const path = `${profile._id}/resources`;
      const image = event.target.files[0];

      const resDelete = await remove(currentContent);
      if (resDelete.ok) {
        const reducedImage = await reduceImageSize(image);
        const res = await upload(path, reducedImage);
        if (res.ok) {
          arrayItemsEditor.html.forEach((item, index) => {
            if (item.id === idElement) {
              const contents = arrayItemsEditor;
              contents.html[index].content = res.file;
              contents.html[index].tag = `<img src="${res.file}" alt=""/>`;
              setItems(contents);
              setEditImg(!editImg);
              // localStorage.setItem('contentEditor', JSON.stringify(contents));
            }
          });
        } else {
          setEditImg(false);
        }
      } else {
        setEditImg(false);
      }
    }
  };

  const updateFunctionEvent = (tag, idElement, typeContent) => {
    setUpdateEvent(false);
    setModalShow(false);
    const oldArray = arrayItemsEditor.html;
    const newTag = { id: idElement, type: typeContent, content: tag, tag };
    oldArray.forEach((item, index) => {
      if (item.id === idElement) {
        oldArray[index] = newTag;
      }
    });
    // localStorage.setItem('contentEditor', JSON.stringify(arrayItemsEditor));
  };
  /* ######################### */

  const removeFileToAWS = async (file) => {
    await remove(file);
  };

  const deleteComponentEditor = (idContent, type) => {
    const newArrayContent = { html: [] };
    let content = '';
    // let deleteImage = true;
    arrayItemsEditor.html.forEach((item) => {
      if (item.id !== idContent) {
        newArrayContent.html.push(item);
      } else {
        content = item.content;
      }
    });
    setItems(newArrayContent);
    // localStorage.setItem('contentEditor', JSON.stringify(newArrayContent));
    if (option === 'onlyVideo') {
      let validateVideo = false;
      newArrayContent.html.forEach((item) => {
        if (item.type === 'linkVideo' || item.type === 'iframeVideo') {
          validateVideo = true;
        }
      });
      setContentVideo(validateVideo);
    }
    if (option === 'onlyAudio') {
      let validateAudio = false;
      newArrayContent.html.forEach((item) => {
        if (item.type === 'iframeAudio') {
          validateAudio = true;
        }
      });
      setContentAudio(validateAudio);
    }
    if (type === 'image') {
      removeFileToAWS(content);
    }
  };

  const setActiveClass = (id) => {
    setActiveCont(id);
  };

  useEffect(() => {
    // const EditorContent = localStorage.getItem('contentEditor');
    if (!initialContent) {
      // {id: "", type: "", content: ""}
      // const jsonStr = '{"html":[]}';
      // localStorage.setItem('contentEditor', jsonStr);
      setItems({ html: [] });
    } else {
      // setItems(JSON.parse(EditorContent));
      setItems(initialContent);
      // const elementsEditor = JSON.parse(EditorContent);
      initialContent.html.forEach((item) => {
        if (item.type === 'linkVideo' || item.type === 'iframeVideo') {
          setContentVideo(true);
        }
        if (item.type === 'iframeAudio') {
          setContentAudio(true);
        }
      });
    }
  }, [initialContent]);

  const reorderList = (event) => {
    if (event.destination) {
      const html = [...arrayItemsEditor.html];
      const [movedItem] = html.splice(event.source.index, 1);
      html.splice(event.destination.index, 0, movedItem);
      const newObj = { html: [...html] };
      setItems(newObj);
      // localStorage.setItem('contentEditor', JSON.stringify(newObj));
    }
  };

  const handlePublish = async (estatus) => {
    const details = {
      ...formData,
      estatus,
    };
    setShowPublish(false);
    setSubmitting(true);

    const blob = new Blob([JSON.stringify(arrayItemsEditor)], { type: 'application/json' });
    const file = new File([blob], 'article.json', { type: 'application/json' });
    try {
      if (!initialData) {
        // save article
        const { data } = await saveArticle(file, details, option, session.user.id);
        if (data && data._id) {
          setSubmitting(false);
          setSuccessData({
            show: true,
            title: estatus === 'publicado' ? 'Publicación finalizada' : 'Cambios guardados',
            message: estatus === 'publicado' ? 'La publicación ha sido realizada exitosamente.' : 'La información de su publicación ha sido actualizada correctamente.',
          });
          // shallow routing a la pantalla de edición
          router.replace(`${router.asPath}/${data._id}`, undefined, { shallow: false });
          // mantén la información original en el state del componente padre
          setInitialData(data);
        }
      } else {
        // update existing article
        const res = await updateArticle(file, details, session.user.id, initialData);
        if (res.ok) {
          setSubmitting(false);
          setSuccessData({
            show: true,
            title: estatus === 'publicado' ? 'Publicación finalizada' : 'Cambios guardados',
            message: estatus === 'publicado' ? 'La publicación ha sido realizada exitosamente.' : 'La información de su publicación ha sido actualizada correctamente.',
          });
          setInitialData(res.data);
        }
      }
    } catch (err) {
      setSubmitting(false);
      setErrorData({
        show: true,
        title: 'Ha ocurrido un error',
        message: 'Vuelva a intentarlo más tarde',
      });
      // catch error
    }
  };

  const handleSubmitResources = async (resources) => {
    setSubmitting(true);
    const res = await updateArticleResources(resources, initialData._id);
    setSubmitting(false);
    if (res.ok) {
      setSuccessData({
        show: true,
        title: 'Cambios guardados',
        message: 'La publicación ha sido realizada exitosamente.',
      });
      setInitialData({ recursos: resources });
    } else {
      setErrorData({
        show: true,
        title: 'Ha ocurrido un error',
        message: 'Vuelva a intentarlo más tarde',
      });
    }
  };

  const handleOpenResources = () => {
    if (initialData && initialData._id) {
      setShowResourcesModal(true);
    } else {
      setErrorData({
        show: true,
        title: 'Operación no permitida',
        message: 'Para habilitar otras opciones de visualización de contenido, primero debes guardar o publicar tu artículo.',
      });
    }
  };

  return (
    <div className={styles.editor}>
      <ModalAudio
        show={modalShow}
        updateEvent={updateEvent}
        editInfo={editTag}
        addAudio={addAudioFunct}
        updateFunctionEvent={updateFunctionEvent}
        showModal={() => setModalShow(false)}
      />
      <ModalVideo
        show={modalShowVideo}
        editInfo={editVideo}
        updateEvent={updateEvent}
        addVideo={addVideoFunct}
        updateFunctionEvent={updateFunctionEventVideo}
        showModal={() => setModalShowVideo(false)}
      />
      <ModalLink
        show={modalShowLink}
        editInfo={editVideo}
        updateEvent={updateEvent}
        addLink={addLinkFunct}
        showModal={() => setModalShowLink(false)}
      />
      {
        preview ? (
          <EditorPreviewComponent
            initialData={initialData}
            initialContent={arrayItemsEditor}
            preview={() => setPreview(!preview)}
          />
        ) : (
          <div className={styles.editorContent} align="center">
            <div>
              <DragDropContext
                onDragEnd={reorderList}
              >
                <Droppable droppableId="canvasDrop">
                  {(provided) => (
                    <div
                      id="canvas"
                      className={styles.canvas}
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {
                        (arrayItemsEditor.html && arrayItemsEditor.html.length !== 0)
                          ? (arrayItemsEditor.html.map((item, index) => {
                            return (
                              <div key={item.id}>
                                <EditorOptionRender
                                  index={index}
                                  data={item}
                                  deleteComponentEditor={deleteComponentEditor}
                                  editComponentFunct={editComponentFunct}
                                  handleChangeImage={handleChangeImage}
                                  handleChange={handleChange}
                                  setActiveClass={setActiveClass}
                                  activeOption={activeOption}
                                />
                              </div>
                            );
                          })) : (' Estructura aquí el contenido de tu artículo')
                      }
                      {provided.placeholder}
                    </div>
                  )}

                </Droppable>
              </DragDropContext>
              <ToolsComponent
                option={option}
                addedVideo={addedVideo}
                addedAudio={addedAudio}
                addTextFunct={addTextFunct}
                setModalShowVideo={setModalShowVideo}
                setModalShow={setModalShow}
                setModalShowLink={setModalShowLink}
                addImage={addImage}
              />
            </div>
          </div>
        )
      }
      {/* EDITOR OPTIONS NAV */}
      {
        !preview && (
          <div className={styles.optionsContainer}>

            <TooltipContainer tooltipText="Publicar" placement="left">
              <div
                className={`icon-button icon-button--primary ${styles.optionsItem}`}
                onClick={() => setShowPublish(true)}
              >
                H
              </div>
            </TooltipContainer>

            <TooltipContainer tooltipText="Guardar borrador" placement="left">
              <div
                className={`icon-button icon-button--success ${styles.optionsItem}`}
                onClick={() => handlePublish('borrador')}
              >
                I
              </div>
            </TooltipContainer>

            <TooltipContainer tooltipText="Opciones de visualización" placement="left">
              <div
                className={`icon-button icon-button--secondary ${styles.optionsItem}`}
                onClick={handleOpenResources}
              >
                r
              </div>
            </TooltipContainer>

            <TooltipContainer tooltipText="Vista previa" placement="left">
              <div
                className={`icon-button icon-button--secondary ${styles.optionsItem}`}
                onClick={() => setPreview(!preview)}
              >
                C
              </div>
            </TooltipContainer>
            {
              /*
              <TooltipContainer tooltipText="Detalles" placement="left">
                <div className={`icon-button icon-button--secondary ${styles.optionsItem}`}>J</div>
              </TooltipContainer>
              */
            }
          </div>
        )
      }
      <DetailsModal
        show={showPublish}
        onClose={() => setShowPublish(false)}
        onPublish={handlePublish}
      />
      <ResourcesModal
        show={showResourcesModal}
        initialData={initialData && initialData.recursos}
        onClose={() => setShowResourcesModal(false)}
        articleId={initialData && initialData._id}
        onSubmit={handleSubmitResources}
      />
      <LoadingIndicatorModal
        show={submitting}
        onClose={() => {}}
        textHeader="Guardando cambios"
        textBody="Esta operación podría tardar unos minutos, por favor espere."
      />
      <SuccessIndicatorModal
        show={successData.show}
        onClose={() => setSuccessData({ ...successData, show: false })}
        textHeader={successData.title}
        textBody={successData.message}
      />
      <ErrorIndicatorModal
        show={errorData.show}
        onClose={() => setErrorData({ ...errorData, show: false })}
        textHeader={errorData.title}
        textBody={errorData.message}
      />
    </div>
  );
};

EditorComponent.propTypes = {
  option: PropTypes.string,
};

EditorComponent.defaultProps = {
  option: '',
};

export default EditorComponent;
