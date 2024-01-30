import React, { useContext, useEffect, useState } from 'react'
import Update from './Update'
import "./profile.scss"
import { EnvelopeSimple, User } from 'phosphor-react';
import { AuthContext } from '../../context/AuthContext'
import { Button, Divider } from '@mui/material';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;


export default function Profile() {
  const {currentUser} = useContext(AuthContext);
  // console.log(currentUser);
  const [user, setUser] = useState("");
  const [openUpdate, setOpenUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiUrl}/users?userId=${currentUser._id}`);
        // const res = await axios.get('/users', {userId: currentUser._id});
        setUser(res.data);
        // console.log(res.data);
      } catch (err) {
      }
    };
    fetchData();
  }, [currentUser._id]);


  if (!currentUser) {
    // If currentUser is null, you may want to handle this case accordingly.
    return (
      <div>
        <p>User not logged in.</p>
      </div>
    );
  }



  return (
    <div className='allcolors-container'>
        <div className="userInfoContainer">
          <h1>
            Welcome <br />
            {user.username}!
          </h1>
          <div className="userInfo">
            <p><b>Email</b>: <User size={20} /> {user.username} </p>
            <p><b>Email</b>: <EnvelopeSimple size={20} /> {user.email} </p>
          </div>
        </div>

        <div className="editButtonContainer">
          <Button
            // component={Link}
            // to={`/auth/profile/${username}/edit`}
            // variant="contained"
            // style={{ backgroundColor: '#FFBE33', color: 'white', width: 'fit-content' }}
            onClick={() => setOpenUpdate(!openUpdate)}
          >
            Edit
          </Button>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Divider style={{width: "30%"}} />
          </div>

        {openUpdate && <Update userInfo={currentUser} setUser={setUser} setOpenUpdate={setOpenUpdate}/>} 
        </div>
    </div>
  )
}
