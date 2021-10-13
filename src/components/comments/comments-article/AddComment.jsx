import React, { useEffect } from 'react';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../comments.module.css';
import { fetch as fetchProfile } from '@/reducers/profile';

export const AddComment = React.memo(({
  values, handleInputChange, fieldName, handleSubmit,
}) => {
  const dispatch = useDispatch();

  const { data: profile, fetched } = useSelector((state) => state.profile);

  useEffect(() => {
    if (!fetched) {
      dispatch(fetchProfile());
    }
  }, []);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <li className={styles.liFormat}>
      <form onSubmit={handleSubmitForm} className="d-flex justify-content-center align-items-center">
        <div className="col-lg-1 d-flex justify-content-center align-items-center">
          <Image
            height="45"
            width="45"
            objectFit="contain"
            src={profile.picture === 'string' || !profile.picture ? '/images/profile/no-profile-img.png' : profile.picture}
            className={styles.author_pict}
          />
        </div>

        <div className="col-lg-10 mx-3 d-flex justify-content-center align-items-center">
          <input
            type="text"
            name={fieldName}
            required
            onChange={handleInputChange}
            value={values[fieldName]}
            placeholder={`Escribe un ${fieldName}`}
            className="input"
          />
        </div>
        <div className="col-lg-1 d-flex justify-content-center align-items-center">
          <button
            type="submit"
            disabled={values[fieldName].length === 0}
            // onClick={handleSubmit}
            className="icon-button icon-button--primary py-1 icon"
            title="Guardar"
          >n
          </button>
        </div>
      </form>
    </li>
  );
});
