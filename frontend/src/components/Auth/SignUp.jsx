import React, { useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firestore';
import { doc, setDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore'; // Remove unused import

const SignUp = () => {
  const inputEmail = useRef(null);
  const inputPassword = useRef(null);
  const inputFirstName = useRef(null); // Added
  const inputLastName = useRef(null);  // Added
  const inputDeliveryLocation = useRef(null);
  const inputPhoneNumber = useRef(null);

  const [signUpError, setSignUpError] = useState(null);
  const [phoneNumberError, setPhoneNumberError] = useState(null);
  const navigate = useNavigate();

  const isValidKenyanPhoneNumber = (phoneNumber) => {
    const kenyanPhoneNumberRegex = /^(\+254|0)\d{9}$/;
    return kenyanPhoneNumberRegex.test(phoneNumber);
  };

  const handlePhoneNumberBlur = () => {
    const phoneNumber = inputPhoneNumber.current.value;

    if (phoneNumber && !isValidKenyanPhoneNumber(phoneNumber)) {
      setPhoneNumberError('Invalid Kenyan phone number');
    } else {
      setPhoneNumberError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = inputEmail.current.value;
    const password = inputPassword.current.value;
    const firstName = inputFirstName.current.value; // Added
    const lastName = inputLastName.current.value;   // Added
    const deliveryLocation = inputDeliveryLocation.current.value;
    const phoneNumber = inputPhoneNumber.current.value;

    if (
      email &&
      password &&
      firstName &&  // Added
      lastName &&   // Added
      deliveryLocation &&
      phoneNumber &&
      isValidKenyanPhoneNumber(phoneNumber)
    ) {
      try {
        // Create user account
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Save additional user information to Firestore
        const userDocRef = doc(collection(db, 'users'), user.uid);
        await setDoc(userDocRef, {
          email,
          firstName,  // Added
          lastName,   // Added
          deliveryLocation,
          phoneNumber,
        });

        console.log('Account created successfully');
        navigate('/checkout');
      } catch (error) {
        const errorMessage = error.message;
        setSignUpError(errorMessage);
      }
    }
  };

  return (
    <>
      {signUpError && (
        <div className="alert alert-danger" role="alert">
          {signUpError}
        </div>
      )}

      <div className="container">
        <h1>Create account</h1>
        <form className="inputs-wrapper" onSubmit={handleSubmit}>

        <label>First Name</label>
          <input type="text" ref={inputFirstName} placeholder="Enter your first name" />

          <label>Last Name</label>
          <input type="text" ref={inputLastName} placeholder="Enter your last name" />

          <label>Enter email</label>
          <input type="text" ref={inputEmail} placeholder="Enter your email" />

          <label>Password</label>
          <input type="password" ref={inputPassword} placeholder="Enter password" />

         
          <label>Delivery Location</label>
          <input type="text" ref={inputDeliveryLocation} placeholder="Enter delivery location" />

          <label>Phone Number</label>
          <input
            type="text"
            ref={inputPhoneNumber}
            placeholder="Enter phone number"
            onBlur={handlePhoneNumberBlur}
          />
          {phoneNumberError && (
            <div className="error-message" role="alert">
              {phoneNumberError}
            </div>
          )}

          <button>Sign up</button>
        </form>

        <div className="links-wrapper">
          <NavLink to={'/login-page'}>Already have an account? Login</NavLink>
        </div>
      </div>
    </>
  );
};

export default SignUp;
