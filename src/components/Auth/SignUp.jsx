import React, { useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firestore';

const SignUp = () => {
    const inputEmail = useRef(null)
    const inputPassword = useRef(null)
    const [signUpError, setSignUpError] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = (e)=>{
        e.preventDefault();
        let email = inputEmail.current.value;
        let password = inputPassword.current.value;
        if(email && password){
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                navigate('/checkout')
                console.log('account created successfully')
              })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                setSignUpError(errorMessage)
              });
        }

    }
  return (
    <>
    {
        signUpError&&<div className="alert alert-danger" role="alert">
        The email already exist.
       </div>
    }
    
    <div className='container'>
    <h1>Create account</h1>
    <form className='inputs-wrapper' onSubmit={handleSubmit}>
        <label>Enter email</label>
        <input type='text' ref={inputEmail} placeholder='Enter your email'  />
        <label>Password</label>
        <input type='password' ref={inputPassword} placeholder='Enter password'  />
        <button>Sign up</button>
    </form>
    <div className='links-wrapper'>
        <NavLink to={'/login-page'}>Already have an account? Login</NavLink>
    </div>
 </div>
    </>
  )
}

export default SignUp