import React from 'react'
import './App.css';
import Homepage from './components/Homepage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Ins from './components/Ins';
import Imu from './components/Imu';
import Dcconv from './components/Dcconv';
import Eleccards from './components/Eleccards';
function App () {
  return (
    <div className='App'>
      <header >
      <Router>
        <Routes>
        <Route path="/" element={<Signup/>}/>
        <Route path="/Login" element={<Login/>}/> 
        <Route path="/Homepage" element={<Homepage/>}/> 
        <Route path="/Ins" element={<Ins/>}/>
        <Route path="/Imu" element={<Imu/>}/>
        <Route path="/Dcconv" element={<Dcconv/>}/>
        <Route path="/Eleccards" element={<Eleccards/>}/>
        
        </Routes>
  </Router>
  </header>
           </div>
         );
     
        }
export default App;
