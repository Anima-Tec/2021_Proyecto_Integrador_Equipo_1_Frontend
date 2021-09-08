import React from 'react';
import { useHistory } from 'react-router-dom';

const Index = () => {
  const history = useHistory();
  const goTo = (path) => history.push(path);

  return (
    <div>
      <h1>HYDRA</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
      </p>
      <button onClick={() => goTo('/registro')} type="button">Create an account</button>
      <button onClick={() => goTo('/login')} type="button">Log in</button>
    </div>
  );
};

export default Index;
