import './App.css';
import React, { useContext } from 'react'

import { BrowserRouter as Route, Routes } from 'react-router-dom';

import Layout from "./layout/Layout";
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Profile from './pages/profile/Profile';
import AllColors from './components/allColors/AllColors';
import MyColors from './components/myColors/MyColors';
import LikedColors from './components/likedColors/LikedColors'

import { AuthContext } from './context/AuthContext'
import DetailColors from './components/detailColors/DetailColors';


function App() {
  const {currentUser} = useContext(AuthContext);

  return (
      <Routes>

        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
        
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Register />} />
          <Route path="/allcolors" element={<AllColors />} />
          <Route path="/allcolors/:orderNumber" element={<DetailColors />} />
          <Route path="/mycolors" element={<MyColors />} />
          <Route path="/mylikes" element={<LikedColors />} />
        </Route>
      </Routes>
      // <h1>unko</h1>


  );
}

export default App;
