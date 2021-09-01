import React from 'react';

const Inicio = () => (
  <div>
    <h1>HYDRA</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
    </p>
    <button type="button">Create an account</button>
    <button type="button">Log in</button>
  </div>
);

const LogIn = () => (
  <div>
    <p>
      Welcome back!
    </p>
    <h1>Please. Log In</h1>
    <form>
      <input />
      <input />
      <button type="button">
        Continue
        {'>'}
      </button>
    </form>
    <p>
      or
    </p>
    <button type="button">
      Create an account
    </button>
  </div>
);

const SignUp = () => (
  <div>
    <p>
      Hello there!
    </p>
    <h1>Let’s get started</h1>
    <form>
      <input />
      <input />
      <input />
      <button type="button">
        Create an account
      </button>
    </form>
  </div>
);

const Home = () => (
  <div>
    <p>
      Hello, Usser
    </p>
    <input />
  </div>
);

export {
  Inicio, LogIn, SignUp, Home,
};
