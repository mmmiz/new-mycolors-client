import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

import "../allColors/eachColor.scss";
import { Box, Button, Divider } from '@mui/material';

const colorAttributes = ['Main', 'About', 'Products', 'News', 'Contact'];

export default function DetailColors() {
  const { orderNumber } = useParams();
  const location = useLocation();
  const colorInfo = location.state;

  return (
    <div className='allcolors-container'>
      <h2>Detail</h2>
      
      <Box className='color-box'>
        {colorAttributes.map((att) => (
          <div key={`${colorInfo._id}-${att}`} className='color-item'>
            <div className='color-item-top'>
              <div
                style={{
                  backgroundColor: att === "Main" ? colorInfo.mainColor.color : colorInfo[`${att.toLowerCase()}Color`],
                  width: '36px',
                  height: '36px',
                  marginRight: '10px',
                  borderRadius: '50%',
                }}
              />   
              <b>{att === 'Main' ? 'Main' : `${att}`}</b>
            </div>
            <p>{att === 'Main' ? `${colorInfo.mainColor.color} ` : `${colorInfo[`${att.toLowerCase()}Color`]} `}</p>
          </div>
        ))}

        <div className='color-item-right'>
          <Button variant="contained" size='small'>
            Order Number: {orderNumber}
          </Button>
        </div>

        <Divider className='divider' sx={{ display: { xs: 'block', md: 'none' } }} />
      </Box>
    </div>
  );
}
