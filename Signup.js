import React, { useState } from 'react'
import axios from 'axios'
import './Signup.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser, faEnvelope, faLock, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
function Signup() {
   const navigate = useNavigate();
   const [message, setMessage] = useState('');
   const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
        const handleSubmit = async(e) => {
            e.preventDefault();
            setMessage('');
            setPasswordError('');
            if (!validatePassword(password)) {
              setPasswordError('Password must be at least 8 characters long, contain at least one digit, one special character, one uppercase letter, and one lowercase letter.');
              return;
          }
            if (!username || !password || !email) {
              setMessage('All fields are required');
              return;
              
          }
            try{
              const response=await axios.post('http://localhost:5000/Signup',
              {
                username, 
                password, 
                email
              });
              setMessage('Signedin successfully');
              navigate('/Homepage');
            }
                catch(error)  { 
                  setMessage('Enter valid details' + error.message);
                }
              };
              
              const validatePassword=(password) => {
                const minLength = 8;
                const hasDigit = /\d/;
                const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
                const hasUpperCase = /[A-Z]/;
                const hasLowerCase = /[a-z]/;
                return (
                  password.length >= minLength &&
                  hasDigit.test(password) &&
                  hasSpecialChar.test(password) &&
                  hasUpperCase.test(password) &&
                  hasLowerCase.test(password)
                );
              };
            
        
  return (
    <div className = "form">
      <div className='header'>
    <u>Sign Up</u></div>
      <form onSubmit={handleSubmit}>
      <label className='Name'> 
      <div className='div1'>
      <span className='icon1'>
        <FontAwesomeIcon icon={faUser}/>
      </span>
        <input type="text" name= "username" placeholder=" Username" onChange = {(e) => setUsername(e.target.value)} value = {username} required/>
        </div>
      </label>
       <label className='Email'>
        <div className='div2'>
       <span className='icon2'>
        <FontAwesomeIcon icon={faEnvelope}/>
      </span>
        <input type = "email" name="email" placeholder =" Email Id" onChange = {(e) => setEmail(e.target.value)} value = {email} required/>
        </div>
         </label>
      <label className='password'>
        <div className='div3'>
      <span className='icon3'>
        <FontAwesomeIcon icon={faLock}/>
      </span>
        <input type={passwordVisible ? 'text' : 'password'} name="password" placeholder="Create your password" onChange = {(e) => setPassword(e.target.value)} value = {password} required/>
        <span className='eye' onClick={() => setPasswordVisible(!passwordVisible)}>
        <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
        </span>
        </div>
        <br/> 
        {passwordError && <p className="error">{passwordError}</p>}
      </label>
    <p><b>Already have an Account ? < Link to = "/Login">Login</Link></b></p><br/>
      <button className='Button'
     /*onClick={() => { navigate ("/Homepage");}}*/
        ><b>Signup</b></button>
      </form>
      {message && <p>{message}</p>} {/* Display the message */}
    </div>
  )
}

export default Signup
 