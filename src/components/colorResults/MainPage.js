// MainPage.js

import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './mainPage.scss';

export default function MainPage({ backgroundImage }) {
  const [backgroundImageLog, setBackgroundImageLog] = useState('');

  useEffect(() => {
    setBackgroundImageLog(backgroundImage);
  }, [backgroundImage]);

  // if (!backgroundImageLog) {
  //   return <p>No background image </p>;
  // }

  return (
    <div className="main-page-container">

      <div className="header-container">
        <div className="logo">
          <b>Example</b>
        </div>
        <div className="navigation">
          <b>about</b>
          <b>products</b>
          <b>news</b>
          <b>contact</b>
        </div>
      </div>

      <div
        className="background-color-container"
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/backgroundColor/${backgroundImage})` }}
      >
        <div className="content-container">
          <Typography className="main-text">
            <h1>Hello, Welcome!</h1>
            <p>Power corrupts; absolute power corrupts absolutely.</p>
            <p>Speak softly and carry a big stick</p>
            <p>That's one small step for a man, a giant leap for mankind.	</p>
            <Button variant="contained" className="read-more-button" href="#contained-buttons">
              Read more
            </Button>
          </Typography>
        </div>
     </div>

    </div>
  );
}
