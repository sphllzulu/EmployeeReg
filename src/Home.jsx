import './Home.css'
import React from 'react'
import Navbar from './Navbar'
import Tbl from './Tbl'
import BottomNavbarSmall from './BottomNavbarSmall'



const Home = () => {
  return (
    <div>
      <Navbar/>
      <Tbl/>
      <BottomNavbarSmall/>
      
    </div>
  )
}

export default Home
