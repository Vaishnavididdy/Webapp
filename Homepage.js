import React from 'react'
import './Homepage.css';
import {FaBars, FaSearch}from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { useState } from "react";
import 'react-datepicker/dist/react-datepicker.css';


    /*const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);*/
  
    const menuItem=[
        {
            path:"/Homepage",
            name:"Homepage",
            
        },
        {
            path:"/Imu",
            name:"IMU",
            
        },
        {
            path:"/Ins",
            name:"INS",
            
        },
        {
            path:"/Dcconv",
            name:"DC Convertor",
            
        },
        {
            path:"/Eleccards",
            name:"Electronic Cards",
            
        }
        
    ];
    const Homepage = ({ children }) => {
      const [searchQuery, setSearchQuery] = useState("");
    
      const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
      };
    return (
      <>
      <label className="search">
            <div className="search_bar" >
              <span className='bar'>
                <FaBars/>
              </span>
       <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearchChange} />
       
            </div>
          </label>
        <div className="container">
           {/*<div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="bar">
               <FaBars/>
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars/>
                   </div>
               </div>*/}

               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           
                           <div /*style={{display: isOpen ? "block" : "none"}}*/ className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
            
           <main>{children}</main>
        </div>
        </>
    );
};

export default Homepage;  