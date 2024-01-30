import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import '../allColors/EachColor'

import "../allColors/eachColor.scss";
import { Divider } from '@mui/material';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import EachColor from '../allColors/EachColor';
import MainPage from '../colorResults/MainPage';
import AboutUs from '../colorResults/AboutUs';
import Products from '../colorResults/Products';
import News from '../colorResults/News';
import Contacts from '../colorResults/Contacts' 
import Footer from '../colorResults/Footer';

const apiUrl = process.env.REACT_APP_API_URL;


export default function DetailColors() {
  const {currentUser} = useContext(AuthContext);
  // const { orderNumber } = useParams();
  const location = useLocation();
  const colorInfo = location.state; //  === {state: color} under eachColor

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
      <h2>Detail</h2>
    
      <div style={{marginBottom: "15vh"}}>
        {Array.isArray(colorInfo) ? (
        colorInfo.map((color) => (
          <EachColor key={color._id} color={color} 
              details={color}
              context="deleteDetail"
              setLikedColors={setLikedColors} 
          />
          ))
         ) : (
          <EachColor key={colorInfo._id} color={colorInfo} 
              details={colorInfo}
              context="deleteDetail"
              setLikedColors={setLikedColors} 
          />
        )}
          {/* <Divider className='divider' sx={{ display: { xs: 'block', md: 'none' } }} /> */}
      </div> 

      

      <div>
      <MainPage backgroundImage={colorInfo.mainColor.url} />
       <AboutUs backgroundColor={colorInfo.aboutColor} />
       <Products backgroundColor={colorInfo.productsColor} />
       <News backgroundColor={colorInfo.newsColor} />
       <Contacts backgroundColor={colorInfo.contactColor} />
      <Footer />
      </div>


    </div>
  );
}
