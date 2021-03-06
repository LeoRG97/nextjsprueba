import { Container, Row, Col } from 'react-bootstrap';
import useSWR from 'swr';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  LoadingIndicator, Switch, SubscriptionModal, CourseDetailComponent,
} from '@/components';
import TooltipContainer from '@/components/articleManager/editorComponents/tooltipContainer/TooltipContainer';
import { fetchData } from '@/services/swr';
import CategorySelector from '@/components/categorySelector/CategorySelector';
import OptionDropdown from '@/components/optionsDropdown/OptionsDropdown';

const Footer = dynamic(() => import('@/components/footer/Footer'));

export default function Home() {
  const { data } = useSWR('preferencias', fetchData);
  const [checked, setChecked] = useState(false);
  const [checkedInverted, setCheckedInverted] = useState(false);

  return (
    <div className="main-container main-bg">
      <main className="container pt-5">
        <h1 className="title-xl">
          Super Title (Light)
        </h1>

        <h1 className="title-xl text--theme-dark bg-light">
          Super Title (Dark)
        </h1>

        <h2 className="title">
          Title
        </h2>

        <h3 className="subtitle">
          Subtitle
        </h3>

        <p className="text-md">
          Button and paragraph text
        </p>

        <small className="d-block text-sm">
          Secondary text
        </small>

        <a className="d-block text-link" href="#">
          Highlighted text (or Link text)
        </a>

        <small className="d-block text-md text--theme-error">
          Error text
        </small>

        <hr className="bg-light" />

        <h6 className="subtitle">Botones</h6>

        <button className="button button--theme-primary me-2">
          Primary
        </button>

        <button className="button button--theme-secondary me-2">
          Secondary
        </button>

        <button className="button button--theme-success me-2">
          Success
        </button>

        <button className="button button--theme-light me-2">
          Light
        </button>

        <button className="button button--theme-warning me-2">
          Warning
        </button>

        <br />
        <br />

        <button className="button button--theme-primary me-2">
          <span className="button__icon-left">I</span>{' '}Left icon
        </button>

        <button className="button button--theme-primary me-2">
          Right icon{' '}<span className="button__icon-right">I</span>
        </button>

        <button className="button button--theme-secondary me-2">
          <span className="button__icon-left">I</span>{' '}Secondary
        </button>

        <button className="button button--theme-success me-2">
          <span className="button__icon-left">I</span>{' '}Success
        </button>

        <button className="button button--theme-light me-2">
          <span className="button__icon-left">I</span>{' '}Light
        </button>

        <button className="button button--theme-warning me-2">
          <span className="button__icon-left">I</span>{' '}Warning
        </button>

        <hr className="bg-light" />

        <h6 className="subtitle">Botones de iconos</h6>
        <div className="d-flex">
          <button className="icon-button icon-button--primary me-2">H</button>
          <button className="icon-button icon-button--secondary me-2">H</button>
          <button className="icon-button icon-button--success me-2">H</button>
        </div>

        <hr className="bg-light" />

        <h6 className="subtitle">Switches</h6>

        <div className="d-flex align-items-center">
          <label className="subtitle me-2">Normal</label>
          <Switch
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
        </div>
        <div className="d-flex align-items-center">
          <label className="subtitle me-2">Invertido</label>
          <Switch
            inverted
            checked={checkedInverted}
            onChange={() => setCheckedInverted(!checkedInverted)}
          />
        </div>

        <hr className="bg-light" />

        <h6 className="subtitle">Campos de texto</h6>
        <div className="col-12 col-md-6">
          <input
            type="text"
            placeholder="Regular input"
            className="input"
          />
        </div>

        <div className="col-12 col-md-6">
          <div className=" input-container">
            <input
              type="text"
              placeholder="Input with icon"
              className="input"
            />
            <span className="icon input__icon">C</span>
          </div>
        </div>

        <hr className="bg-light" />

        <h6 className="subtitle">Tooltips</h6>
        <TooltipContainer
          tooltipText="I am a tooltip!"
          placement="right"
        >
          <button className="icon-button icon-button--secondary">K</button>
        </TooltipContainer>

        <hr className="bg-light" />
        <h6 className="subtitle">Select</h6>
        <div className="col-12 col-md-6">
          <div className="select-arrow">
            <select
              id="rol"
              name="rol"
              placeholder="Selecciona uno"
              className="select"
            >
              <option value="">Selecciona uno</option>
              <option value="admin">Administrador</option>
              <option value="user-author">Colaborador</option>
              <option value="user-reviewer">Curador</option>
              <option value="user-premium">Premium</option>
            </select>
          </div>
        </div>

        <hr className="bg-light" />

        <h6 className="subtitle">Selector m??ltiple</h6>
        <div className="col-12 col-md-6">
          {data && (
            <CategorySelector
              data={data.data}
              placeholder="Selecciona las categor??as"
              addCategory={() => {}}
              deleteCategory={() => {}}
            />
          )}
        </div>

        <hr className="bg-light" />

        <h6 className="subtitle">Elementos de un dropdown</h6>
        {/* Clases para los items contenidos en un dropdown cualquiera */}
        <div className="w-25">
          <div className="drop-item">
            <span className="drop-item__content">Normal</span>
          </div>
          <div className="drop-item">
            <span className="drop-item__icon">K</span>
            <span className="drop-item__content">Con icono</span>
          </div>
        </div>

        <hr className="bg-light" />

        <h6 className="subtitle">Dropdown de opciones (para art??culos)</h6>

        <div className="position-relative mb-5">
          <OptionDropdown
            options={[
              {
                option: 'Modificar',
                event: false,
              },
              {
                option: 'Eliminar',
                event: false,
              },
            ]}
          />
        </div>
        <hr className="bg-light" />

        <h6 className="subtitle">Indicador de proceso</h6>
        <LoadingIndicator />

        <hr className="bg-light" />
        <div className="d-none d-lg-block">
          <h6 className="subtitle">Editor de texto</h6>
          <Container className="purple-content" style={{ minHeight: '200px' }}>
            <Row>
              <Col>
                <div className="Editor-content">
                  <button className="Edit-btn move-btn icon">4</button>
                  <div className="Editor-container">
                    <textarea className="Edit-area text--theme-light" defaultValue="" />
                  </div>
                  <div className="Edit-dropdown-content">
                    <div className="Edit-dropdown">
                      <button className="Edit-dropbtn icon">0</button>
                      <div className="Edit-dropdown-container">
                        <a href="#"><span className="icon">K</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Modificar</a>
                        <a href="#"><span className="icon">L</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Eliminar</a>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <SubscriptionModal />
        <CourseDetailComponent />
      </main>

      <Footer />
    </div>
  );
}
