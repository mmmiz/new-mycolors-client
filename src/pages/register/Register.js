import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@mui/material";

const apiUrl = process.env.REACT_APP_API_URL;


export default function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '', // Add confirmPassword to the state
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/auth/register`, formData);
      setErrorMessage('');
      console.log(response.data);
      navigate('/login?registerSuccess=true'); 
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage('User with this email address already exists.');
      } else {
        setErrorMessage('Error registering user. Please try again later.');
      }
      console.error('Error registering user:', error);
    }
  };

  const formFields = [
    { name: 'username', label: 'Username', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'password', label: 'Password', type: 'password' },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password' },
  ];

  return (
    <div className="login">
      <div className="loginWrapper">

        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <h2>REGISTER</h2>
            {formFields.map((field) => (
              <input
                key={field.name}
                placeholder={field.label}
                required
                name={field.name}
                type={field.type}
                className="loginInput"
                onChange={handleChange}
                autoComplete=""
              />
            ))}
            <button className="loginButton" type="submit">
              Sign Up
            </button>
        
            <button className="loginRegisterButton">Login</button>
          </form>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}
