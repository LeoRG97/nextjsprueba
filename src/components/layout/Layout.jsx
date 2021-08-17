import React from 'react';
import NavbarComponent from '../navbar/Navbar';

const Layout = ({ children, className }) => {
  return (
    <>
      <NavbarComponent />
      <div className={`main-container main-bg ${className}`}>
        {children}
      </div>
    </>
  );
};

export default Layout;
