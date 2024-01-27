import React, { useContext, useEffect, useState } from 'react'
import Update from './Update'

import { AuthContext } from '../../context/AuthContext'
import { Button } from '@mui/material';
import axios from 'axios';

export default function Profile() {
  const {currentUser} = useContext(AuthContext);
  // console.log(currentUser);

  const [user, setUser] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/users?userId=${currentUser._id}`);
        // const res = await axios.get('/users', {userId: currentUser._id});
        setUser(res.data);
        console.log(res.data);
      } catch (err) {
      }
    };
    fetchData();
  }, [currentUser._id]);

  useEffect(() => {
    console.log('User state updated:', user);
  }, [user]);


  const [openUpdate, setOpenUpdate] = useState(false);


  return (
    <div>
      <p>{user.email}</p>
      <Button onClick={() => setOpenUpdate(!openUpdate)}>Edit</Button>
      {openUpdate && <Update userInfo={currentUser} setUser={setUser} setOpenUpdate={setOpenUpdate}/>}
    </div>
  )
}
