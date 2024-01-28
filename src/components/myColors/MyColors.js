import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import EachColor from '../allColors/EachColor';
import { Box } from '@mui/material';
import "../allColors/allcolors.scss"

const apiUrl = process.env.REACT_APP_API_URL;


export default function MyColors() {
  const [myColors, setMyColors] = useState([]);
  const {currentUser} = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiUrl}/colors/mycolors/${currentUser._id}`);
        setMyColors(res.data);
        // console.log(res.data);
      } catch (err) {
        //  error
      }
    };
    fetchData();
  }, [currentUser._id]);



  return (
    <div className='allcolors-container'>
      <h2>My Colors</h2>
      <Box className='color-box'>
        {myColors.length > 0 ? (
          myColors.map((c) => (
            <EachColor key={c._id} color={c} setAllColors={setMyColors} />
          ))
        ) : (
          <p>no colors registered</p>
        )}
      </Box>
    </div>
  )
}
