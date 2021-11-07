/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import FlipCameraIosIcon from '@mui/icons-material/FlipCameraIos';
import styles from '../../App.module.scss';

const UploadImage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      {selectedImage ? (
        <>
          <div>
            <IconButton aria-label="my reports">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className={styles.UploadImageLabel} htmlFor="photo"><FlipCameraIosIcon sx={{ color: 'violet' }} /></label>
              <input
                id="photo"
                className={styles.UploadInput}
                type="file"
                name="photo"
                onChange={(event) => {
                  console.log(event.target.files[0]);
                  console.log(event.target.files);
                  setSelectedImage(event.target.files[0]);
                }}
              />
            </IconButton>
            <IconButton onClick={() => setSelectedImage(null)} aria-label="my reports">
              <DeleteIcon sx={{ color: 'violet' }} />
            </IconButton>
          </div>
          <img alt="not fount" width="100px" src={URL.createObjectURL(selectedImage)} />
        </>
      ) : (
        <>
          <div>
            <IconButton aria-label="my reports">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className={styles.UploadImageLabel} htmlFor="photo"><PhotoCameraIcon sx={{ color: 'violet' }} /></label>
              <input
                id="photo"
                className={styles.UploadInput}
                type="file"
                name="photo"
                onChange={(event) => {
                  console.log(event.target.files[0]);
                  console.log(event.target.files);
                  setSelectedImage(event.target.files[0]);
                }}
              />
            </IconButton>
          </div>
          <img alt="not fount" width="100px" src="/default.jpg" />
        </>
      )}
    </>
  );
};

export default UploadImage;
