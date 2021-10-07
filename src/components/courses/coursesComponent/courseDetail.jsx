/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { useRouter } from 'next/router';
// import { BUCKET_URL } from '@/global/constants';
import styles from './course.module.css';
// import Link from 'next/link';
import OptionDropdown from '@/components/optionsDropdown/OptionsDropdown';

const CourseDetailComponent = ({ isAdmin }) => {
  const [showOptions, setShowOptions] = useState(false);

  const router = useRouter();

  const showCourse = () => {
    router.push('/');
  };

  /* const handleUpdate = () => {
    router.push('/');
  }; */

  const [options] = useState([
    {
      option: 'Modificar',
      event: true,
      eventName: (() => console.log('update')),
      data: true,
      iconType: 'K',
    },
    {
      option: 'Eliminar',
      event: true,
      eventName: (() => console.log('delete')),
      data: true,
      iconType: 'L',
    },
  ]);

  return (
    <>
      <div
        key="id"
        className={`${styles.cardContainer}`}
        onMouseEnter={() => setShowOptions(true)}
        onMouseLeave={() => setShowOptions(false)}
      >
        <div className={styles.cardImageContainer}>
          {
            !isAdmin && showOptions && (
              <>
                <div className={styles.options}>
                  <OptionDropdown
                    options={options}
                  />
                </div>
              </>

            )
          }
          {!isAdmin && (
            <div className={styles.optionsMobile}>
              <OptionDropdown
                options={options}
              />
            </div>
          )}
          <div className={`text-sm text--theme-light ${styles.trendingLabel}`}>
            {'Tecnología'}{' '}<span className="icon text--theme-light">8</span>
          </div>
          <img
            onClick={showCourse}
            src="/images/resourses/PortadaVideoHome.png"
            alt=""
          />
        </div>
        <div onClick={showCourse} className={styles.cardNumbersContainer}>
          <div className="text-sm">Un curso de Ingrid Jacobs</div>
          <div className={`text-sm ${styles.likesContainer}`}><span className="icon">c</span>{' '}00000</div>
          <div className={`text-sm ${styles.peopleContainer}`}><span className="icon">Z</span>{' '}00000</div>
        </div>
        <>
          <div onClick={showCourse} className={`title ${styles.cardMargin}`}>
            What is Lorem Ipsum?
          </div>
        </>
        <>
          <div onClick={showCourse} className="text-sm text--theme-light">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </div>
        </>
      </div>
    </>
  );
};

export default CourseDetailComponent;
