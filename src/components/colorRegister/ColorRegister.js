import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import MainColorSelect from './MainColorSelect';
import OthersSelect from './OthersSelect';
import MainPage from "../colorResults/MainPage"
import AboutUs from '../colorResults/AboutUs';
import Products from "../colorResults/Products"
import News from "../colorResults/News"
import Contact from "../colorResults/Contacts"
import Footer from '../colorResults/Footer';
import "./colorRegister.scss"

const apiUrl = process.env.REACT_APP_API_URL;

export default function ColorRegister() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [palette, setPalette] = useState({
    userId: currentUser ? currentUser._id : '',
    mainColor: {
      url: 'white.jpg',
      color: '',
    },
    aboutColor: '#F7F7F7', 
    productsColor: '',
    newsColor: '#F7F7F7', 
    contactColor: '#DBD7D2',
    colorCategory: '', 
  });

  const handleMainColorChange = (main) => {
    setPalette((prev) => ({
      ...prev,
      mainColor: main
    }));
  };

  const handleOthersColorChange = (color, label) => {
    setPalette((prev) => ({
      ...prev,
      [`${label.toLowerCase()}Color`]: color,
    }));
  };

  const handleRegisterColors = async () => {
    try {
      const response = await axios.post(`${apiUrl}/colors`, palette);
      console.log('Colors registered successfully:', response.data);
      navigate('/allcolors');
    } catch (error) {
      console.error('Error registering colors:', error);
    }
  };


  const isRegisterButtonDisabled = () => {
    return (
      palette.mainColor.color === '' ||
      palette.aboutColor === '' ||
      palette.productsColor === '' ||
      palette.newsColor === '' ||
      palette.contactColor === ''
    );
  };

  return (
    <div className='container'>

        <div className='top'>
          <div className='top-item'>
            <MainColorSelect onMainImageChange={handleMainColorChange} />
            <OthersSelect label="About" onAboutUsColorChange={(color) => handleOthersColorChange(color, 'About')} />
            <OthersSelect label="Products" onProductsColorChange={(color) => handleOthersColorChange(color, 'Products')} />
            <OthersSelect label="News" onNewsColorChange={(color) => handleOthersColorChange(color, 'News')} />
            <OthersSelect label="Contact" onContactColorChange={(color) => handleOthersColorChange(color, 'Contact')} />
          </div>
          
          <Button
            className={isRegisterButtonDisabled() ? 'disabled-button' : 'enabled-button'}
            style={{ margin: "30px", backgroundColor: "#FF91AF", color: "white" }}
            disabled={isRegisterButtonDisabled()}
            onClick={currentUser ? handleRegisterColors : () => navigate("/login")} 
            >
            Register
          </Button>
        </div>

        <MainPage backgroundImage={palette.mainColor.url} />
        <AboutUs backgroundColor={palette.aboutColor} />
        <Products backgroundColor={palette.productsColor} />
        <News backgroundColor={palette.newsColor} />
        <Contact backgroundColor={palette.contactColor} />
        <Footer />
    </div>
  );
}
