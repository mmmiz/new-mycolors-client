import { Stack } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';


export default function authLayout() {
  return (
    <>
      <div
        // sx={{ maxWidth: "100%",  }}
        // direction="column"
        // alignItems={"center"}
      >
       <Header />
      <Outlet />
      </div>
    </>
  )
}
