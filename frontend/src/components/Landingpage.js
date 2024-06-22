import React from 'react';
import Main from '../components1/Main';
import Header from '../components1/Header';
import Buttons from '../components1/Buttons';
import Screens from '../components1/Screens';
import  './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="desktopHeader05">
      <Main />
      <Header />
      <Buttons />
      <Screens />
    </div>
  );
};

export default LandingPage;
