import React, { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import './Login.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser, faLock, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
<script type="text/javascript" src="Signup.js"></script>

function Login1() {
   const navigate = useNavigate()
   const [message, setMessage] = useState('');
   const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    /*const [passwordError, setPasswordError] = useState('');*/
  
      
        const handleSubmit = async(e) => {
            e.preventDefault();
            setMessage('');
            /*setPasswordError('');*/

            if (!username || !password ) {
              setMessage('All fields are required');
              return;
        }
        try{
          const response=await axios.post('http://localhost:5000/Login',
          {
            username, 
            password
          });
      setMessage(response.data.message);
      if (response.status === 200) {
        navigate('/Homepage');
         }
        }
            catch(error)  { 
              console.error('Login error:', error.response ? error.response.data : error.message);
              if (error.response && error.response.data && error.response.data.message) {
                setMessage('Enter valid details: ' + error.response.data.message);
              } else {
                setMessage('Enter valid details: ' + error.message);
              }
            }
      };
  return (
    <div className = "form">
      <div className='header'>
    <u>Login</u></div>
    <br/>
      <form onSubmit={handleSubmit}>
      <label className='Name'> 
      <div className='div1'>
      <span className='icon1'>
        <FontAwesomeIcon icon={faUser}/>
      </span>
      <input type="text" name= "username" placeholder="Username" onChange = {(e) => setUsername(e.target.value)} value = {username}/>
        </div>
      </label>
      <label className='password'>
        <div className='div3'>
      <span className='icon3'>
        <FontAwesomeIcon icon={faLock}/>
      </span>
        <input type={passwordVisible ? 'text' : 'password'} name="password" placeholder="Password" onChange= {(e) => setPassword(e.target.value)} value = {password}/>
        <span className='eye' onClick={() => setPasswordVisible(!passwordVisible)}>
        <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
        </span>
        </div>
        <br/> 
      </label>
      <div className='anchor2'>
    <p><b>Not yet Registered ? < Link to = "/">Signup</Link></b></p><br/>
    {/*<b><a className='anchor' href="">Forgot Password </a></b>*/}<br/></div>
      <button className='Button' /*onClick={()=>navigate('/Homepage')}*/><b>Login</b></button>
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}

export default Login1
 