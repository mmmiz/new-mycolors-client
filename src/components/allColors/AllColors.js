import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, AlertTitle, Box, Pagination } from '@mui/material';
import EachColor from './EachColor';
import { useLocation } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;


export default function AllColors() {
  const [allColors, setAllColors] = useState({ colors: [], totalPages: 1 });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const location = useLocation();
  const registerMessage = new URLSearchParams(location.search).get('registerSuccess');
  const msg = { type: 'success', text: 'Color Registration Success! Please check all colors', condition: registerMessage };


  // GET all colors
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiUrl}/colors?page=${currentPage}`);
        setAllColors(res.data);
        setTotalPages(res.data.totalPages);
      } catch (err) {
      }
    };
    fetchData();
  }, [currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  }

  
  return (
    <div className='allcolors-container'>

      {msg.condition && (
        <Alert>
          <AlertTitle>{msg.type}</AlertTitle>
          <strong>{msg.text}</strong>
        </Alert>
      )}

      <h2>All COLORS</h2>

      <Box className='color-box'>
        {allColors.colors.map((c) => (
          <EachColor key={c._id} color={c} 
            setAllColors={setAllColors}
            context="allLikedColors" />
        ))}
      </Box>

      <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} shape="rounded" 
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "30px"}} />
      
    </div>
  );
};






