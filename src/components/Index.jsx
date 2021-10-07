/* eslint-disable linebreak-style */
import React from 'react';
import Button from './singleComponent/Button';
import styles from '../App.module.scss';

const Index = () => (
  <div className={styles.ContainerAllIndex}>
    <div className={styles.ContainerGlobal}>
      <div className={styles.ContainerTextIndex}>
        <img alt="" src="/Logo.png" height="200" />
        <h1>HYDRA</h1>
        <p> Dar tu opinión nunca fue tan facil. </p>
      </div>
      <div className={styles.ButtonGroup}>
        <Button
          styles={styles.BtnIndexOne}
          text="Comienza ahora"
          path="/registro"
        />
        <Button
          styles={styles.BtnIndexTwo}
          text="Iniciar sesión"
          path="/login"
        />
      </div>
    </div>
  </div>
);

export default Index;
