import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';
import './BottomNavbarSmall.css'

import { FaHome } from "react-icons/fa";
import { MdFolderDelete } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";



function BottomNavbarSmall() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    isMobile && (
      <nav className="bottom-navbar">
        
        <ul className="list">
          <li>
            <Link to="/home"><FaHome style={{fontSize:'50px'}}/></Link>
          </li>
          
          <li>
            <Link to="/active"><GrStatusGood  style={{fontSize:'50px'}}/></Link>
          </li>
          <li>
            <Link to="/removed"><MdFolderDelete  style={{fontSize:'50px'}}/></Link>
          </li>
        </ul>
        
      </nav>
    )
  );
}

export default BottomNavbarSmall;
