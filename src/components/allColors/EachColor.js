import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Divider } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import "./eachColor.scss"

const apiUrl = process.env.REACT_APP_API_URL;


const EachColor = ({ color, setAllColors, setLikedColors, context, details }) => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [like, setLike] = useState(color?.likes?.length || 0 );
  const [isLiked, setIsLiked] = useState(false);

  // console.log(color.colorCategory);

  
  // DELETE a COLOR
  const deleteHandle = async () => {
    try {
      const alert = window.confirm('Are you sure you want to delete this color?');
      if (alert) {
        await axios.delete(`${apiUrl}/colors/${color._id}`);
        if (context === "deleteDetail") {
          navigate("/allcolors");
        } else {
          setAllColors((prevColors) => {
            if (!prevColors || !Array.isArray(prevColors)) {
              return [];
            }
            return setAllColors((prevColors) => prevColors.filter((prevColor) => prevColor.orderNumber !== color.orderNumber));

          })
        }
      }
    } catch (error) {
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
      setIsLiked(!isLiked); // for myliked page
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
    <div key={color._id} className="each-color-container">


     <div className='each-color-container-top'>
      {colorAttributes.map((att) => (
        <div className='each-color-box' key={`${color._id}-${att}`}>  

          <div className='color-item-top'>
            <div
              style={{  // CIRCLE BALL
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
        {!details && (
          <Button
            variant="contained" 
            size='small' 
            onClick={() => navigate(`/allcolors/${color.orderNumber}`, { state: color })
          }>
          Details
        </Button>
        )}


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
    </div>  

    <div>
      {color.colorCategory.length > 0 && color.colorCategory.map((c) => (
        <Button 
          sx={{marginRight: "10px", borderRadius: '50%'}}
          variant="outlined" 
          size="small"
          key={c} 
          onClick={() => navigate(`/allcolors/category?color=${c}`)
        }>
        {c}
        </Button>
      ))}
    </div>




      <Divider className='divider' sx={{ display: { xs: 'block', md: 'none' } }} />

    </div>
  );
  
};

export default EachColor;
