import { Button, colors } from '@mui/material';
import React, { useEffect, useState } from 'react';
import './mainPage.scss';

export default function MainPage({ backgroundImage }) {
  const [backgroundImageLog, setBackgroundImageLog] = useState('');

  useEffect(() => {
    setBackgroundImageLog(backgroundImage);
  }, [backgroundImage]);


  return (
    <>
      <div className="main-header">
        <b className='main-header-left'>Example</b>
        <div className="main-header-right">
          {/* <b>about</b>
          <b>products</b>
          <b>news</b> */}
          <b>contact</b>
        </div>
      </div>

      {/*  */}

      <div style={{ 
        backgroundImage: `url(${process.env.PUBLIC_URL}/backgroundColor/${backgroundImageLog})`,
        backgroundSize: 'cover',
        }}
        className="main-content"
       >
        <div className="main-text">
          <h1>Hello, Welcome!</h1>
          <p>Power corrupts; absolute power corrupts absolutely.</p>
          <p>Speak softly and carry a big stick</p>
          <p>That's one small step for a man, a giant leap for mankind.	</p>
          <Button variant="contained" className="read-more-button" href="#contained-buttons">
            Read more
          </Button>
        </div>
     </div>

    </>
  );
}
