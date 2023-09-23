import React, { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firestore' 
const ForgotPassword = () => {
    const [resetSuccess, setResetSuccess] = useState(null)
    const [resetError, setResetError] = useState(null);
    const userEmail = useRef(null)
    const handleResetPassword =(e)=>{
        e.preventDefault();
        const email = userEmail.current.value;
        if(email){

            sendPasswordResetEmail(auth, email)
            .then((link) => {
                // Construct password reset email template, embed the link and send
                // using custom SMTP server.
                setResetSuccess('success')
            })
            .catch((error) => {
                // Some error occurred.
                setResetError(error.message)
            });
    }
}
  return (
  <>
  {
    resetSuccess&&<div className="alert alert-success" role="alert">
    A reset link sent to your email.
    </div>
  }
  {
    resetError&&<div className="alert alert-danger" role="alert">
    The email you entered does not exist.
    </div>
  }
  <div className='container'>
    <h1>Reset password</h1>
    <form className='inputs-wrapper' onSubmit={handleResetPassword}>
        <label>Enter email</label>
        <input type='text' ref={userEmail} placeholder='Enter your email'  />
        <button>Reset password</button>
    </form>
    <div className='links-wrapper'>
        <NavLink to={'/login-page'}>Go back to login.</NavLink>
    </div>
 </div>
  </>
    
  )
}

export default ForgotPassword