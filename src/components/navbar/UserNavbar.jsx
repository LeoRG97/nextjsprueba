import { signOut } from 'next-auth/client';
import Image from 'next/image';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import styles from './navbar.module.css';

const UserNavbarComponent = ({
  picture, name,
}) => {
  const [show, setShow] = useState(false);
  const showDropdown = () => {
    setShow(!show);
  };
  const hideDropdown = () => {
    setShow(false);
  };

  const navDropdownTitle = (
    <div className="row align-items-center">
      <div className={`${styles.navDropDownImage} col`}>
        <Image height="45" width="45" objectFit="contain" src={picture === 'string' || !picture ? '/images/profile/no-profile-img.png' : picture} />
      </div>
      <div className="col text-md">{name}</div>
    </div>
  );
  const logOut = async () => {
    await signOut({ callbackUrl: `${window.location.origin}/login` });
  };

  return (
    <>
      <NavDropdown
        className={styles.navDropDown}
        title={navDropdownTitle}
        id="nav-dropdown-profile"
        show={show}
        onMouseEnter={showDropdown}
        onMouseLeave={hideDropdown}
      >
        <NavDropdown.Item>Perfil</NavDropdown.Item>
        <NavDropdown.Item>Ajustes</NavDropdown.Item>
        <NavDropdown.Item onClick={() => logOut()}>Cerrar sesión</NavDropdown.Item>
      </NavDropdown>
    </>
  );
};

UserNavbarComponent.propTypes = {
  picture: PropTypes.string,
  name: PropTypes.string,
};

UserNavbarComponent.defaultProps = {
  name: '',
  picture: '',
};

export default UserNavbarComponent;
