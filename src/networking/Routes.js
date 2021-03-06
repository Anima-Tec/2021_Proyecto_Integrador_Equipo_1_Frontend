/* eslint-disable linebreak-style */
const ROUTES = {
  ALL: '/all',
};

const generateURL = (route) => `${process.env.REACT_APP_API_BASE_URL}${route}`;

const generateBackendURL = (route) => `${process.env.REACT_APP_API_ALT_URL}${route}`;

export { ROUTES, generateURL, generateBackendURL };
