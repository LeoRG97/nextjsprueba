import React from 'react';
import GlobalModals from '../modalsIndicators/ModalContainer';
import NavbarComponent from '../navbar/Navbar';
import ThinkToolsModal from '../thinkTools/thinkToolsModal/ThinkToolsModal';

const Layout = ({ children, className }) => {
  return (
    <>
      <NavbarComponent />
      <div className={`main-container main-bg ${className}`}>
        {children}
      </div>
      <ThinkToolsModal />
      <GlobalModals />
    </>
  );
};

export default Layout;
