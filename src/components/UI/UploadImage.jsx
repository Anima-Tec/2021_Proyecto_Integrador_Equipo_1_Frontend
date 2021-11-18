/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Box } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import styles from './UploadImage.module.scss';

const UploadImage = ({ photo, photoReturn }) => {
  const [selectedImage, setSelectedImage] = useState(photo);

  useEffect(() => {
    photoReturn(selectedImage);
  }, [selectedImage]);

  return (
    <>
      {selectedImage ? (
        <>
          <Box className={styles.UploadImageWrapper}>
            <Box className={styles.IconsWrapper}>
              <IconButton aria-label="my reports">
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label className={styles.UploadImageLabel} htmlFor="photo"><FlipCameraIosIcon sx={{ color: 'violet' }} /></label>
                <input
                  id="photo"
                  className={styles.UploadInput}
                  type="file"
                  name="photo"
                  accept="image/png, image/jpeg"
                  webkitRelativePath
                  onChange={(event) => {
                    setSelectedImage(event.target.files[0]);
                  }}
                />
              </IconButton>
              <IconButton onClick={() => setSelectedImage(null)} aria-label="my reports">
                <DeleteIcon sx={{ color: 'violet' }} />
              </IconButton>
            </Box>
            <img alt="not fount" width="100px" src={URL.createObjectURL(selectedImage)} />
          </Box>
        </>
      ) : (
        <>
          <Box className={styles.UploadImageWrapper}>
            <IconButton aria-label="my reports">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className={styles.UploadImageLabel} htmlFor="photo"><PhotoCameraIcon sx={{ color: 'violet' }} /></label>
              <form name="subida-imagenes" type="POST" encType="multipart/formdata">
                <input
                  id="photo"
                  className={styles.UploadInput}
                  type="file"
                  name="photo"
                  accept="image/png, image/jpeg"
                  onChange={(event) => {
                    setSelectedImage(event.target.files[0]);
                  }}
                />
              </form>
            </IconButton>
            <img alt="not fount" width="100px" src="/default.jpg" />
          </Box>
        </>
      )}
    </>
  );
};
UploadImage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  photo: PropTypes.object.isRequired,
  photoReturn: PropTypes.func.isRequired,
};

export default UploadImage;
