import { Button } from '@mui/material';
import React from 'react';
import "./news.scss"
// import { isBackgroundColorDark } from '../../utill/textColor';

export default function News({ backgroundColor }) {
  // const textColor = isBackgroundColorDark(backgroundColor) ? 'white' : 'black';


  const data = Array.from({ length: 3 }, (_, index) => ({
    date: '2023 Sep',
    product: 'Product',
    description: 'We cannot solve problems with the kind of thinking we employed when we came up with them.',
  }));

  return (
    <div className='news-content' style={{backgroundColor: backgroundColor}}>

      <div className='news-box'>

        <div className='news-top'>
          <h2>News</h2>
          <p>We cannot solve problems with the kind of thinking we employed when we came up with them.</p>
        </div>

      {data.map((item, index) => (
        <div key={index} className='news-bottom'>
          <p>{item.date}</p>
          <p>{item.product}</p>
          <p>{item.description}</p>
        </div>
      ))}
      </div>
      <Button sx={{backgroundColor: backgroundColor}}>
        read more
      </Button>
    </div>
  );
}
