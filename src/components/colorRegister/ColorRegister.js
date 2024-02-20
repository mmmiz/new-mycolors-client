import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, AlertTitle, Button } from '@mui/material';
import MainColorSelect from './MainColorSelect';
import OthersSelect from './OthersSelect';
import MainPage from "../colorResults/MainPage"
import AboutUs from '../colorResults/AboutUs';
import Products from "../colorResults/Products"
import News from "../colorResults/News"
import Contact from "../colorResults/Contacts"
import Footer from '../colorResults/Footer';
import "./colorRegister.scss"
import ColorCheck from './ColorCheck';

const apiUrl = process.env.REACT_APP_API_URL;

export default function ColorRegister() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const location = useLocation();
  const loginMessage = new URLSearchParams(location.search).get('loginSuccess');
  const guestLoginMessage = new URLSearchParams(location.search).get('guestLoginSuccess');

  
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
    colorCategory: [], 
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

  const handleColorSelection = (colors) => {
    setPalette((prev) => ({
      ...prev,
      // colorCategory: colors.join(', ') 
      colorCategory: colors.length > 0 ? colors : []
    }));
    // console.log('Selected colors:', colors);
  };


  const handleRegisterColors = async () => {
    try {
      const response = await axios.post(`${apiUrl}/colors`, palette);
      console.log('Colors registered successfully:', response.data);
      navigate('/allcolors?registerSuccess=true');
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

  const messages = [
    { type: 'success', text: 'Login Success!', condition: loginMessage === 'true' },
    { type: 'success', text: 'Logged in as a guest', condition: guestLoginMessage === 'true' },
    // { type: 'success', text: 'Color Registration Success! Please check all colors', condition: isColorRegistered },
  ];

  return (
    <div className='container'>
      
      {messages.map((msg, index) => ( 
        msg.condition && (
          <Alert key={index}>
            <AlertTitle>{msg.type}</AlertTitle>
            <strong>{msg.text}</strong>
          </Alert>
        )
      ))}

        <div className='top'>
          <div className='top-item'>
            <MainColorSelect onMainImageChange={handleMainColorChange} />
            <OthersSelect label="About" onAboutUsColorChange={(color) => handleOthersColorChange(color, 'About')} />
            <OthersSelect label="Products" onProductsColorChange={(color) => handleOthersColorChange(color, 'Products')} />
            <OthersSelect label="News" onNewsColorChange={(color) => handleOthersColorChange(color, 'News')} />
            <OthersSelect label="Contact" onContactColorChange={(color) => handleOthersColorChange(color, 'Contact')} />
          </div>

          <ColorCheck onColorSelection={handleColorSelection}/>
           
          <Button
            className={isRegisterButtonDisabled() ? 'disabled-button' : 'enabled-button'}
            style={{ margin: "30px", backgroundColor: "#FF91AF", color: "white" }}
            disabled={isRegisterButtonDisabled()}
            onClick={currentUser ? handleRegisterColors : () => navigate("/login?loginRequired=true")} 
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
