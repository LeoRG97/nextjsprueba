import React, { useEffect, useRef, useState } from 'react';
import LoadingIndicator from '@/components/loadingIndicator/LoadingIndicator';
import styles from './imagePicker.module.css';
import { BUCKET_URL } from '@/global/constants';
import { reduceImageSize } from '@/helpers/images';

const ImagePicker = React.memo(({
  image, setImage, prevUrl, resizeType,
}) => {
  const imgRef = useRef();
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCoverPreview = (file) => {
    setPreviewUrl('');
    if (file.type.includes('image')) {
      setLoading(true);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setLoading(false);
        setPreviewUrl(reader.result);
      };
    } else {
      setImage('');
    }
  };

  const handleFile = async (file) => {
    const reducedFile = await reduceImageSize(file, resizeType);
    setImage(reducedFile);
  };

  useEffect(() => {
    if (image) {
      handleCoverPreview(image);
    }
  }, [image]);

  useEffect(() => {
    if (prevUrl) {
      setPreviewUrl(`${BUCKET_URL}${prevUrl}`);
    }
  }, [prevUrl]);

  return (
    <>
      {previewUrl ? (
        <div className={styles.imageContainer}>
          <button className={`${styles.editControl} ${styles.squareBtn}`} onClick={() => imgRef.current.click()}>
            <span className="icon">K</span>
          </button>
          <img src={previewUrl} className={styles.image} alt="preview" />
        </div>
      )
        : (
          <div className={styles.emptyImg}>
            {!loading
              ? (
                <div className={styles.uploadControl}>
                  <button onClick={() => imgRef.current.click()} className={styles.squareBtn}>
                    <span className="icon">E</span>
                  </button>
                  <span className="text-md">Insertar</span>
                </div>
              )
              : <LoadingIndicator />}
          </div>
        )}
      <input
        type="file"
        className="input--hidden"
        ref={imgRef}
        accept="image/*"
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </>
  );
});

export default ImagePicker;
