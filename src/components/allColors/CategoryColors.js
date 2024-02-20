import React, { useEffect, useState } from 'react'
import EachColor from './EachColor';
import { Box } from '@mui/material';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

export default function CategoryColors() {
  const [category, setCategory] = useState();
  const [selectedColor, setSelectedColor] = useState('');
  const location = useLocation();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const selectedCategory = new URLSearchParams(location.search).get('color');
        if (selectedCategory) {
          setSelectedColor(selectedCategory)
          const res = await axios.get(`${apiUrl}/colors/category?colorCategory=${selectedCategory}`);
          setCategory(res.data);
          // console.log(res.data);
        }
      } catch (err) {
        console.error('Error fetching category colors:', err);
      }
    };
    fetchData();
  }, [location.search]);

  
  return (
    <div>
      <h2>{selectedColor} category</h2>
      
      <Box className='color-box'>
      {Array.isArray(category) && category.map((c) => (
          <EachColor key={c._id} color={c} />
        ))}
      </Box>

    </div>
  )
}


