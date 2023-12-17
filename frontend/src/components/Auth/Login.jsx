import React, { useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firestore';
 const Login = () => {
    const inputEmail = useRef(null)
    const inputPassword = useRef(null)
    const [LoginError, setLoginError] = useState(null) 
    const navigate = useNavigate();
    const handleLogin = (e)=>{
        e.preventDefault();
        let email = inputEmail.current.value;
        let password = inputPassword.current.value;
        if(email&&password){
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed in 
             const loggedInUser = userCredential.user;
             console.log('user is : ', loggedInUser)
              navigate('/checkout')
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setLoginError(errorMessage)
            });
        }
    }
   return (
    <>
    {
        LoginError&&<div className="alert alert-danger" role="alert">
        Invalid email/password.
    </div>
    }
     <div className='container'>
        <h1>Login</h1>
        <form className='inputs-wrapper' onSubmit={handleLogin}>
            <label>Enter email</label>
            <input type='text' ref={inputEmail} placeholder='Enter your email' />
            <label>Password</label>
            <input type='password' ref={inputPassword} placeholder='Enter password' />
            <button>Login</button>
        </form>
        <div className='links-wrapper'>
            <NavLink to={'/forgot-password'}>Forgot password?</NavLink>
            <NavLink to={'/signup'}>Create an account/signUp.</NavLink>
        </div>
     </div>
     </>
   )
 }
 
 export default Login