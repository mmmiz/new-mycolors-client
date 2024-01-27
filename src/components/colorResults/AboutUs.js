// Import statements
import React from 'react';
import { Button, Typography } from '@mui/material';
import './aboutUs.scss'; // Import the SCSS file

export default function AboutUs({ backgroundColor }) {
  // const textColor = isBackgroundColorDark(backgroundColor) ? 'white' : 'black';

  return (
    <div className="container" style={{ backgroundColor }}>

      <div className="content">
        <img
          src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2ZmaWNlfGVufDB8fDB8fHww"
          alt="office"
          className="image"
        
        />

        <div className="text" style={{ textAlign: 'center' }}>
          {/* <h1>About us</h1> */}
          <Typography>
            <p>The greatest glory in living lies not in never falling, but in rising every time we fall.</p>
            <p>The way to get started is to quit talking and begin doing.</p>
            <p>Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma  <br/>
              – which is living with the results of other people's thinking.</p>

            <Button variant="contained" href="#contained-buttons">
              Read more
            </Button>
          </Typography>
        </div>
      </div>

    </div>
  );
}
