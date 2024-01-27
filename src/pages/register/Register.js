import axios from "axios";
import './register.scss';
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
      const response = await axios.post('/auth/register', formData);
      setErrorMessage('');
      console.log(response.data);
      navigate('/login'); 
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
            <button className="loginRegisterButton">Log into Account</button>
          </form>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}
