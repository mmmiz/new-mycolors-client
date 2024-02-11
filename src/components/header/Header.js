import React, { useContext } from 'react'
import "./header.scss"
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios';
import GuestLogin from '../../pages/login/Guest';

const apiUrl = process.env.REACT_APP_API_URL;


export default function Header() {
  const navigate = useNavigate();
  const { currentUser, dispatch } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await axios.post(`${apiUrl}/auth/logout`);
      dispatch({ type: 'LOGOUT' });
      navigate('/login?logoutSuccess=true'); 
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };


  return (
    <>
      <div className='headerWrapper'>

        <div className='left' >
          <Link to="/"><h2 className='left-sub'>My colors</h2></Link>
        </div>

          {currentUser ? (
            <div className='right'>
              <Link to={'/allcolors'}><b>AllColors</b></Link>
              <Link to={'/mycolors'}><b>MyColors</b></Link>
              <Link to={'/mylikes'}><b>Likes</b></Link>

            {/* <div className='right-sub' style={{gap: "20px"}}> */}
              <Link to={'/profile'}>
                <button className='btn'>
                  <b>Profile</b>
                </button>
              </Link>
              <button className='btn' onClick={handleLogout}>
                <b>Logout</b>
              </button>
            {/* </div> */}
          </div>
          ) : (
            <div className='right'>
              <Link to={'/register'}>
                <button className='btn'>
                  <b>Register</b> 
                </button>
              </Link>

              <Link to={'/Login'}>
                <button className='btn'>
                  <b>Login</b>
                </button>
              </Link>
              <GuestLogin />
            </div>
          )}

      </div>
    </>
  )
}
