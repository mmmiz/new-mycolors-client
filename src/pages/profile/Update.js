import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./update.scss"

export default function Update({userInfo, setUser, setOpenUpdate}) {
  const [userData, setUserData] = useState({
    username:'',
    email: '',
  });

  // console.log(userInfo);


  // Existing User INFO input 
  useEffect(() => {
    setUserData({
      username: userInfo.username,
      email: userInfo.email,
    });
  }, [userInfo]);


  const handleChange = (e) => {
    const {name, value} = e.target;
    // console.log(name, value)
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }  

  const handleUpdate = async(e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/users/${userInfo._id}`, userData);
      // console.log(res.data);

      // REFLECT immidiately in the Profile
      const updatedUserData = await axios.get(`/users?userId=${userInfo._id}`);
      setUser(updatedUserData.data);

      setOpenUpdate(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      if (err.response && err.response.data) {
        alert(err.response.data.error);
      } else {
        alert("An error occurred while updating the profile. Please try again.");
      }
    }
  };    

  return (
    <div className="updateContainer">
      <label>
        <b>Username:</b>
        <input type="text" name="username" value={userData.username} onChange={handleChange} />
      </label>

      <label>
        <b>Email:</b>
        <input type="email" name="email" value={userData.email} onChange={handleChange} />
      </label>

      <button onClick={handleUpdate}>Update Profile</button>
    </div>
  );
}

