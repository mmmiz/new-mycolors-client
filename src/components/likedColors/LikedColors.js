import { Box } from '@mui/material';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import EachColor from '../allColors/EachColor';
import { AuthContext } from '../../context/AuthContext';
import "../allColors/eachColor.scss"

const apiUrl = process.env.REACT_APP_API_URL;


export default function LikedColors() {
  const {currentUser} = useContext(AuthContext);

  const [likedColors, setLikedColors] = useState([]);

    // GET all colors
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await axios.get(`${apiUrl}/colors/my-liked-colors/${currentUser._id}`);
        
          setLikedColors(res.data);
          // console.log(res.data);
        } catch (err) {
        }
      };
      fetchData();
    }, [currentUser._id]);

  return (
    <div className='allcolors-container'>
      <h2>My Liked Colors</h2>
      <Box className='color-box'>
       {likedColors.length > 0 ? (
          likedColors.map((c) => 
            <EachColor 
              key={c._id} 
              color={c} 
              setLikedColors={setLikedColors} 
            />
          )
        ) : (
          <p>You have not liked any colors</p>
        )}
      </Box>
    </div>
  )
}
