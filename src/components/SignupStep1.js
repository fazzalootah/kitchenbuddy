// SignupStep1.js
import React, { useState } from 'react';
import '../index.css';
import {auth} from '../firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignupStep1 = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      auth.auth().createUserWithEmailAndPassword(email.value, password.value);
      setCurrentUser(true);
      console.log(currentUser + 'currentUser');
    } catch (error) {
      alert(error);
    }
  };
  if (currentUser) {
    console.log(currentUser);
  }



  return (
    <body className='signim'>
      <form onSubmit={handleSubmit} className='signup'>
        <div>
          <h3 id='sig'>Sign Up</h3>
          <p id='sig'>Get Started: Sign Up for Personalised AI-Powered Meal Planning</p>
        </div>
        <input 
          type="text" 
          // value={fullName} 
          // onChange={(e) => setFullName(e.target.value)} 
          placeholder="Full Name" 
          required 
        />
        <input 
          type="email" 
          // value={email} 
          // onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          name='email'
          required 
        />
        <input 
          type="password" 
          // value={password} 
          // onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          name='password'
          required 
        />

        <button type="submit" id='sbsiup'><a href="/step-2">Sign Up</a></button>
        <>
      <p>Already have an account? <a href='/login'><span id='lg-su'>Log In</span></a></p>
      </>
      </form>
    </body>
  );
};

export default SignupStep1;
