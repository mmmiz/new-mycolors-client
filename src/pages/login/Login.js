import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './login.scss'
import { Button } from "@mui/material";

const apiUrl = process.env.REACT_APP_API_URL;

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { isFetching, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  // console.log(currentUser);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'LOGIN_START' });

      const response = await axios.post(`${apiUrl}/auth/login`, formData);

      if (response.data.user) {
        // console.log('Token:', response.data.token);
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.user });
        // console.log(response.data.user);
        navigate("/");
      } else {
        dispatch({ type: 'LOGIN_FAILURE' });
        // console.error('Invalid response format:', response);
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      // console.error('Error logging in:', error.message);
    }
  };

  return (
    <div className="login">
      

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
            <Button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <p>Logging </p>
              ) : (
                "Log In"
              )}
            </Button>
            <span className="loginForgot">Forgot Password?</span>
            <Button className="loginRegisterButton">
              {isFetching ? (
                 <p>Logging </p>
              ) : (
                "Create a New Account"
              )}
            </Button>
          </form>
        </div>
      {/* </div> */}

      
    </div>
  );
}
