import React from 'react';
import dynamic from 'next/dynamic';
import NavbarComponent from '../navbar/Navbar';
// import GlobalModals from '../modalsIndicators/ModalContainer';
// import ThinkToolsModal from '../thinkTools/thinkToolsModal/ThinkToolsModal';
const ThinkToolsModal = dynamic(() => import('../thinkTools/thinkToolsModal/ThinkToolsModal'));
const GlobalModals = dynamic(() => import('../modalsIndicators/ModalContainer'));

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
