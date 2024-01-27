import React, { useContext } from 'react'
import ColorRegister from '../../components/colorRegister/ColorRegister'
import { AuthContext } from '../../context/AuthContext'


export default function Home() {
  const {currentUser} = useContext(AuthContext);
  console.log(currentUser);

  return (
    <>
     {/* <ColorRegister /> */}
     unko
    </>
    
  )
}
