import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import EachColor from './EachColor';

const apiUrl = process.env.REACT_APP_API_URL;


export default function AllColors() {
  const [allColors, setAllColors] = useState([]);

  // GET all colors
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiUrl}/colors`);
        setAllColors(res.data);
        // console.log(res.data);
      } catch (err) {
      }
    };
    fetchData();
  }, []);

  return (
    <div className='allcolors-container'>
      <h2>All COLORS</h2>

      <Box className='color-box'>
        {allColors.map((c) => (
          <EachColor key={c._id} color={c} 
            setAllColors={setAllColors}
            context="allLikedColors" />
        ))}
      </Box>
      
    </div>
  );
};






