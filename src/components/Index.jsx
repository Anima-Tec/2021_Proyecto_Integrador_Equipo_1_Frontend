/* eslint-disable linebreak-style */
import React from 'react';
import Button from './singleComponent/Button';
import styles from '../App.module.scss';

const Index = () => (
  <div className={styles.ContainerAllIndex}>
    <div className={styles.ContainerGlobal}>
      <h1>HYDRA</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
      </p>
      <Button
        text="CREATE AN ACCOUNT"
        path="/registro"
        backgroundImage="linear-gradient(90deg, rgba(154,49,228,1) 0%, rgba(60,158,222,1) 100%, rgba(0,8,36,1) 100%)"
        boxShadow="0px 10px 13px -7px #000000, 0px -10px 27px -8px rgba(154,49,228,0)"
      />
      <Button
        text="LOG IN"
        path="/login"
        backgroundImage="linear-gradient(90deg, rgba(154,49,228,1) 0%, rgba(60,158,222,1) 100%, rgba(0,8,36,1) 100%)"
        boxShadow="0px 10px 13px -7px #000000, 0px -10px 27px -8px rgba(154,49,228,0)"
      />
    </div>
  </div>
);

export default Index;
