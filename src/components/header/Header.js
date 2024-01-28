import React, { useContext, useState } from 'react'
import "./header.scss"
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import axios from 'axios';
import { Button, IconButton, Menu, MenuItem } from '@mui/material';
import GuestLogin from '../../pages/login/Guest';

export default function Header() {
  const navigate = useNavigate();
  const { currentUser, dispatch } = useContext(AuthContext);

  const [menuAnchor, setMenuAnchor] = useState(null);


  const handleLogout = async () => {
    try {
      await axios.post('/auth/logout');
      dispatch({ type: 'LOGOUT' });
      navigate('/login'); 
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };


  return (
    <>
      {/* <div className='header'> */}
        <div className='headerWrapper'>

          <div className='left' >
            <Link to="/"><h2 className='left-sub'>My colors</h2></Link>
          </div>

            {currentUser ? (
              <div className='right'>
                <Link to={'/allcolors'}><b>AllColors</b></Link>
                <Link to={'/mycolors'}><b>MyColors</b></Link>
                <Link to={'/mylikes'}><b>Likes</b></Link>

                <Link to={'/profile'}>
                 <Button className='btn' size="small" variant="outlined" color="primary">
                    <b>Profile</b>
                  </Button>
                </Link>
                <Button className='btn' size="small" variant="outlined" color="primary" onClick={handleLogout}>
                  <b>Logout</b>
                </Button>
            </div>
            ) : (
              <>
                {/* Show hamburger menu only when the screen size is small */}
              {/* <IconButton
                edge="end"
                color="inherit"
                onClick={handleMenuOpen}
                className="hamburger-menu"  
              > */}
                {/* <MenuIcon /> */}
              {/* </IconButton> */}

              {/* Responsive menu */}
              {/* <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleMenuClose}
              > */}
                {/* <MenuItem onClick={handleMenuClose}><Link to={'/allcolors'}>AllColors</Link></MenuItem> */}
                <MenuItem onClick={handleMenuClose}><Link to={'/register'}>Register</Link></MenuItem>
                <MenuItem onClick={handleMenuClose}><Link to={'/login'}>Login</Link></MenuItem>
                <MenuItem onClick={handleMenuClose}><GuestLogin /></MenuItem>
              {/* </Menu> */}

              </>
            )}

        </div>
      {/* </div> */}
    </>
  )
}
