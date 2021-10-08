import { signOut } from 'next-auth/client';
import Image from 'next/image';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import styles from './navbar.module.css';

const UserNavbarComponent = ({
  picture, name,
}) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const showDropdown = () => {
    setShow(!show);
  };
  const hideDropdown = () => {
    setShow(false);
  };
  const firstName = name.split(' ');

  const firstNameResult = firstName[0];

  const navDropdownTitle = (
    <div className="row align-items-center">
      <div className={`${styles.navDropDownImage} col-1`}>
        <Image height="45" width="45" objectFit="cover" objectPosition="center center" src={picture === 'string' || !picture ? '/images/profile/no-profile-img.png' : picture} />
      </div>
      <div className={`${styles.navDropDownName} col-10 text-md`}>{`${firstNameResult}`}</div>
      <span className={`${styles.navDropDownIcon} col-1 icon`}>{1}</span>
    </div>
  );
  const logOut = async () => {
    await signOut({ callbackUrl: `${window.location.origin}/login` });
  };

  const navigateToProfile = () => {
    router.push('/profile/about-me');
  };

  const navigateToSettings = () => {
    router.push('/profile/edit/general');
  };

  return (
    <Nav>
      <NavDropdown
        className={styles.navDropDown}
        title={navDropdownTitle}
        id="nav-dropdown-profile"
        show={show}
        onMouseEnter={showDropdown}
        onMouseLeave={hideDropdown}
      >
        <NavDropdown.Item className="drop-item" onClick={navigateToProfile}>Perfil</NavDropdown.Item>
        <NavDropdown.Item className="drop-item" onClick={navigateToSettings}>Ajustes</NavDropdown.Item>
        <NavDropdown.Item className="drop-item" onClick={() => logOut()}>Cerrar sesión</NavDropdown.Item>
      </NavDropdown>
    </Nav>
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
