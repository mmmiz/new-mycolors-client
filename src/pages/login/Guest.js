import React, { useContext, useState } from 'react'
import {useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
const apiUrl = process.env.REACT_APP_API_URL;


export default function GuestLogin() {
  const navigate = useNavigate();
  const {dispatch} = useContext(AuthContext);
  const [loggingIn, setLoggingIn] = useState(false);

  const handleGuestLogin = async () => {
    try {
      setLoggingIn(true);
      dispatch({ type: 'LOGIN_START' });

      const response = await axios.post(`${apiUrl}/auth/login`, {
        email: 'guest_login@gmail.com',
        password: '12345678',
      });
      
      if (response.data.user) {
        // console.log('Token:', response.data.token);
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.user });
        // console.log(response.data.user);
        navigate("/?guestLoginSuccess=true");
      } else {
        dispatch({ type: 'LOGIN_FAILURE' });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
    }
  };

  return (
      <button
        className="btn"
        // size='small'
        // sx={{
        //   color: "#1F456E",
        //   borderColor: '#1F456E',
        //   '&:hover': {
        //     backgroundColor: '#1F456E',
        //     textDecoration: 'none',
        //     color: 'white',
        //   },
        // }}
        onClick={handleGuestLogin}>
        {loggingIn ? <b>Logging...</b> : <b>Guest Login</b>}
      </button>
  )
}
