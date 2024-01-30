import React from 'react';
import { Button, Typography } from '@mui/material';
import "./contact.scss"
// import { isBackgroundColorDark } from '../../utill/textColor';

export default function Contacts({backgroundColor}) {
  // const textColor = isBackgroundColorDark(backgroundColor) ? 'white' : 'black';

  return (  
    <div className='c-container' style={{backgroundColor: backgroundColor}}>
      <div className='c-box'>
        
        <div className='c-item-first'>
          <h2>My Colors</h2>
          <p>© 2023 MyPalette</p>
        </div>

        <div className='c-item-second'>
          <Typography sx={{textDecoration: 'underline'}}>About</Typography>
          <Typography sx={{textDecoration: 'underline'}}>Products</Typography>
          <Typography sx={{textDecoration: 'underline'}}>News</Typography>
        </div>

        <Button>Contact</Button>

      </div>

    </div>
  );
}

