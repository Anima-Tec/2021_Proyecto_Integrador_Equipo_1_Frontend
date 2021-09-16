/* eslint-disable linebreak-style */
import React from 'react';
import Button from './singleComponent/Button';

const Index = () => (
  <div>
    <h1>HYDRA</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
    </p>
    <Button
      text="CREATE AN ACCOUNT"
      path="/registro"
      backgroundImage="linear-gradient(90deg, rgba(154,49,228,1) 0%, rgba(60,158,222,1) 100%, rgba(0,8,36,1) 100%)"
    />
    <Button
      text="LOG IN"
      path="/login"
      backgroundImage="linear-gradient(90deg, rgba(154,49,228,1) 0%, rgba(60,158,222,1) 100%, rgba(0,8,36,1) 100%)"
    />
  </div>
);

export default Index;
