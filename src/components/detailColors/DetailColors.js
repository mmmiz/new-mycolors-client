import React from 'react'
import { useLocation, useParams } from 'react-router-dom';

import "../allColors/eachColor.scss";
import { Box } from '@mui/material';


export default function DetailColors() {
  const { orderNumber } = useParams();
  const location = useLocation();
  const colorInfo = location.state;

  const colorAttributes = ['Main', 'About', 'Products', 'News', 'Contact'];

  return (
    <div className='allcolors-container'>
     <h2>Detail</h2>

    {colorAttributes.map((att) => (
      <b>{att}</b> 
    ))}
     <Box className='color-box'>
      <p>{orderNumber}</p>
      {colorInfo ? (
        <div>
          <p>{colorInfo.mainColor.color}</p>
          <p>{colorInfo.aboutColor}</p>
          <p>{colorInfo.productsColor}</p>  
        </div>
      ) : (
        <p>No color information available</p>
      )}
     </Box>

    

  
      
 

   

    </div>
  )
}
