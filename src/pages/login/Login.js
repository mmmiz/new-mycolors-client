import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios';
import { useLocation, useNavigate } from "react-router-dom";
import './login.scss'
import { Alert, AlertTitle } from "@mui/material";

const apiUrl = process.env.REACT_APP_API_URL;

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { isFetching, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const location = useLocation();
  const loginRequired = new URLSearchParams(location.search).get('loginRequired');
  const logoutMessage = new URLSearchParams(location.search).get('logoutSuccess');
  const registerMessage = new URLSearchParams(location.search).get('registerSuccess');

  
  const messages = [
    { type: 'success', text: 'Login Required', condition: loginRequired === 'true' },
    { type: 'success', text: 'Logout Success!', condition: logoutMessage === 'true' },
    { type: 'fail', text: 'Register Success, please login!', condition: registerMessage === 'true' },
  ];


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'LOGIN_START' });
      const response = await axios.post(`${apiUrl}/auth/login`, formData);

      if (response.data.user) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.user });
        navigate("/?loginSuccess=true");
      } else {
        dispatch({ type: 'LOGIN_FAILURE' });
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
    }
  };


  return (
    <div className="login">
      {messages.map((msg, index) => ( 
        msg.condition && (
          <Alert key={index}>
            <AlertTitle>{msg.type}</AlertTitle>
            <strong>{msg.text}</strong>
          </Alert>
        )
      ))}

      {/* <div className="loginWrapper"> */}

        <div className="loginRight">
          
          <form className="loginBox" onSubmit={handleLogin}>
            <h2 style={{marginBottom: "40px"}}>LOGIN</h2>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              name="email"
              onChange={handleChange}
              autoComplete="email"
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              name="password"
              onChange={handleChange}
              autoComplete="password"

            />
            <button size="small" className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <p>Logging </p>
              ) : (
                "Log In"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              {isFetching ? (
                 <p>Logging </p>
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      {/* </div> */}

      
    </div>
  );
}
