import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { isFetching, dispatch, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  console.log(currentUser);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: 'LOGIN_START' });

      const response = await axios.post(`${apiUrl}/auth/login`, formData);

      if (response.data.user) {
        console.log('Token:', response.data.token);
        dispatch({ type: 'LOGIN_SUCCESS', payload: response.data.user });
        console.log(response.data.user);
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
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Your App Name</h3>
          <span className="loginDesc">
            Connect with friends and the world around you.
          </span>
        </div>

        <div className="loginRight">
          <form className="loginBox" onSubmit={handleLogin}>
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
            <button className="loginButton" type="submit" disabled={isFetching}>
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
      </div>
    </div>
  );
}
