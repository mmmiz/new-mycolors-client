import React, { useContext, useState } from 'react';
import MainColorSelect from './MainColorSelect';
import OthersSelect from './OthersSelect';
import "./colorRegister.scss";
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;


export default function ColorRegister() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [palette, setPalette] = useState({
    userId: currentUser ? currentUser._id : '' ,
    mainColor: {
      url: '',
      color: '',
    },
    aboutColor: '',
    productsColor: '',
    newsColor: '',
    contactColor: '',
    colorCategory: '',
  });

  const handleMainColorChange = (main) => {
    setPalette((prev) => ({
      ...prev,
      mainColor: main
    }));
    // console.log('Main Color - URL:', main);
  };
  

  const handleColorChange = (color, label) => {
    setPalette((prev) => ({
      ...prev,
      [`${label.toLowerCase()}Color`]: color,
    }));
  };

  const handleRegisterColors = async () => {
    // console.log('Request Body:', palette);
    try {
      const response = await axios.post(`${apiUrl}/colors`, palette);
      console.log('Colors registered successfully:', response.data);

      // const orderNumber = response.data.orderNumber
      // navigate(`/allcolors/${orderNumber}`);
    } catch (error) {
      console.error('Error registering colors:', error);
    }
  };

  return (
    <div className='container'>
      <div className="color-register-container">
        <div className='top'>
          <MainColorSelect onMainImageChange={handleMainColorChange} />
          <OthersSelect label="About" onAboutUsColorChange={(color) => handleColorChange(color, 'About')} />
          <OthersSelect label="Products" onProductsColorChange={(color) => handleColorChange(color, 'Products')} />
          <OthersSelect label="News" onNewsColorChange={(color) => handleColorChange(color, 'News')} />
          <OthersSelect label="Contact" onContactColorChange={(color) => handleColorChange(color, 'Contact')} />
        <button onClick={handleRegisterColors}>Register Colors</button>
        </div>
      </div>


    </div>
  );
}
