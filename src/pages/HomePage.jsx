/* eslint-disable linebreak-style */
import React from 'react';
import Home from '../components/Home';
import NavBar from '../components/NavBar';
import TokenService from '../networking/TokenServie';

const HomePage = () => {
  const data = TokenService.getUser();
  const user = data.data.user[0];
  return (
    <>
      <NavBar username={user.username} />
      <Home />
    </>
  );
};
export default HomePage;
