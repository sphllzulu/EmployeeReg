import './Navbar.css'
import { Link } from "react-router-dom";
import { MdAppRegistration } from "react-icons/md";
import { IoLogOutSharp } from "react-icons/io5";

import React from 'react'

const Navbar = () => {
  return (
    
      <nav>
        <div className='logo1'>
        <MdAppRegistration style={{fontSize:'30px'}} />
        <h1>Regipro</h1>
        </div>
       <ul className='list1'>
         <li>
           <Link to="/home">Home</Link>
         </li>
         
         <li>
           <Link to="/active">Active</Link>
         </li>
         <li>
           <Link to="/removed">Removed</Link>
         </li>
         
       </ul>
       <div>
       <Link to="/"><IoLogOutSharp style={{fontSize:'40px'}} /></Link>
       </div>
     </nav>
    
  )
}

export default Navbar
