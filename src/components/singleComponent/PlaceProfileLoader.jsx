/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ContentLoader from 'react-content-loader';

const PlaceProfileLoader = (props) => (
  <ContentLoader
    speed={2}
    width={700}
    height={350}
    viewBox="0 0 676 324"
    backgroundColor="#9A31E4"
    foregroundColor="#3C9EDE"
    {...props}
  >
    <rect x="254" y="108" rx="3" ry="3" width="88" height="6" />
    <rect x="270" y="127" rx="3" ry="3" width="52" height="5" />
    <rect x="64" y="164" rx="3" ry="3" width="463" height="7" />
    <rect x="64" y="182" rx="3" ry="3" width="429" height="7" />
    <rect x="64" y="200" rx="3" ry="3" width="201" height="7" />
    <circle cx="297" cy="53" r="43" />
    <rect x="246" y="247" rx="3" ry="3" width="88" height="6" />
    <rect x="166" y="266" rx="0" ry="0" width="261" height="176" />
  </ContentLoader>
);

export default PlaceProfileLoader;
