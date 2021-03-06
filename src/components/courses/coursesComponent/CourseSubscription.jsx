import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { BUCKET_URL } from '@/global/constants';
import styles from './course.module.css';

const CourseSubscription = ({
  curso, classContent,
}) => {
  const router = useRouter();

  const showCourse = () => {
    router.push(`/courses/${curso.curso[0].slug}`);
  };

  return (
    curso.curso[0] ? (
      <>
        <div
          key="id"
          className={`${styles.cardContainer}`}
        >
          <div className={`${styles.cardContainerNotFocus} ${styles.cardImageContainer} ${classContent}`}>

            <div className={`text-sm text--theme-light ${styles.trendingLabel}`}>
              {
                curso.categorias && curso.categorias.length > 0 ? (
                  <>
                    {curso.categorias[0].nombre || ''}{' '}
                  </>
                ) : (
                  <>{'Sin categoria'}{' '}</>
                )
              }
            </div>
            {curso.premium && (
              <div className={`text-sm text--theme-light ${styles.trendingLabel} ${styles.premium}`}>
                VIP{' '}<span className="icon text--theme-light">R</span>
              </div>
            )}
            <div className={styles.image}>
              {
                curso.curso[0]?.portada ? (
                  <Image
                    src={`${BUCKET_URL}${curso.curso[0]?.portada}`}
                    alt={curso.curso[0].titulo || ''}
                    layout="fill"
                    onClick={showCourse}
                    objectFit="cover"
                  />
                ) : (
                  <div className={styles.emptyImg}>
                    <span className="icon">E</span>
                  </div>
                )
              }
            </div>

          </div>
          {
            curso.autor[0] ? (
              <div onClick={showCourse} className={styles.cardNumbersContainer}>
                {/* <div className="text-sm">
                {'Un curso de '} {curso.autor[0].name || ''} {curso.autor[0].apellidos || ''}
                </div> */}
                <div className={`text-sm ${styles.likesContainer}`}><span className="icon">c</span>{' '}{curso.curso[0].likes.length || 0}</div>
                <div className={`text-sm ${styles.peopleContainer}`}><span className="icon">Z</span>{' '}{curso.total || 0}</div>
              </div>
            ) : (<></>)
          }
          {
            curso.curso[0].titulo ? (
              <>
                <div onClick={showCourse} className={`title ${styles.cardMargin}`}>
                  {curso.curso[0].titulo || 'Sin t??tulo'}
                </div>
              </>
            ) : (
              <>
                <div className={`title ${styles.cardMargin}`}>
                  Sin t??tulo
                </div>
              </>
            )
          }
          {
            curso.curso[0].descripcion ? (
              <>
                <div onClick={showCourse} className="text-sm text--theme-light">
                  {curso.curso[0].descripcion || 'Sin descripci??n'}
                </div>
              </>
            ) : (
              <>
                <div className="text-sm text--theme-light">
                  Sin descripci??n
                </div>
              </>
            )
          }
        </div>
      </>
    ) : (<></>)
  );
};

export default CourseSubscription;
