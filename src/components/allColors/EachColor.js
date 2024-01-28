import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Divider } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import "./eachColor.scss"

const apiUrl = process.env.REACT_APP_API_URL;


const EachColor = ({ color, setAllColors, setLikedColors, context }) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [like, setLike] = useState(color?.likes?.length || 0 );
  const [isLiked, setIsLiked] = useState(false);

  
  // DELETE a COLOR
  const deleteHandle = async () => {
    try {
      const alert = window.confirm('Are you sure you want to delete this color?');
      if (alert) {
        await axios.delete(`${apiUrl}/colors/${color._id}`);
        setAllColors((prevColors) => prevColors.filter((prevColor) => prevColor.orderNumber !== color.orderNumber));
      }
    } catch (error) {
      // console.error('Error deleting color:', error);
    }
  }

  // LIKE
  useEffect(() => {
    setIsLiked(color?.likes?.includes(currentUser._id));
  },[currentUser._id, color?.likes]);


  const likeHandler = () => {
    try {
      axios.put(`${apiUrl}/colors/${color._id}/like`, { userId: currentUser._id} ); // Who liked it? 
    } catch (err) {}
    if (context !== "allLikedColors") {
      setIsLiked(!isLiked);
      setLikedColors((prevLikedColors) => prevLikedColors.filter((likedColor) => likedColor._id !== color._id));
    } else {
      setLike(isLiked ? like - 1 : like + 1);
      setIsLiked(!isLiked);
    }
  };

  // function filterLikedColors(prevLikedColors, colorIdToRemove) {
  //   return prevLikedColors.filter((likedColor) => likedColor._id !== colorIdToRemove);
  // }
  // setLike(function(prevLikedColors) {
  //   return filterLikedColors(prevLikedColors, color._id);
  // });

  // console.log(color.mainColor.color);

  const colorAttributes = ['Main', 'About', 'Products', 'News', 'Contact'];

  return (
    <div key={color._id} className="color-row">
      {colorAttributes.map((att) => (
        <div key={`${color._id}-${att}`} className='color-item'>
          <div className='color-item-top'>
            <div
              style={{
                backgroundColor: att === "Main" ? color.mainColor.color : color[`${att.toLowerCase()}Color`],
                width: '36px',
                height: '36px',
                marginRight: '10px',
                borderRadius: '50%',
              }}
            />   
            <b>{att === 'Main' ? 'Main' : `${att}`}</b>
          </div>
          <p>{att === 'Main' ? `${color.mainColor.color} ` : `${color[`${att.toLowerCase()}Color`]} `}</p>
        </div>
      ))}

      <div className='color-item-right'>
        <Button variant="contained" size='small' onClick={() => navigate(`/allcolors/${color.orderNumber}`, { state: color })}>
          Detail
        </Button>
        
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "10px"}}>
          {color.userId === currentUser._id ? (
            <Button variant="outlined" size="small" color="error" onClick={() => deleteHandle(color.orderNumber)}>Delete</Button>
            
            ) : (
            
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: '5px' }}>
              <div onClick={likeHandler}
                 style={{
                  color: isLiked ? 'red' : 'grey', 
                  cursor: 'pointer',
                }}>
                {isLiked ? '❤︎' : '❤︎'}
              </div>
              <span className="postLikeCounter text-base">{like}</span>
            </div>

          )}
        </div>
      
      </div>

      <Divider className='divider' sx={{ display: { xs: 'block', md: 'none' } }} />

    </div>
  );
  
};

export default EachColor;
