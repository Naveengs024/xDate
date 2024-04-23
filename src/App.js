import React, { useState } from 'react';
import './App.css';

import $ from 'jquery';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UserForm() {
  
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const toggleMode = () => {
    setIsSignUpMode(!isSignUpMode);
  };

  const [formData, setFormData] = React.useState({
    userId: 0,
    user_Name: '',
    user_Email: '',
    address: '',
    country_Id: '',
    state_Id: '',
    district_Id: '',
    mobile_No: '',
    password: '',
    rememberMe: true,
    createdDate: new Date().toISOString(),
    modifiedDate: new Date().toISOString(),
    isDeleted: false,
  });

  //const [toasterMessage, setToasterMessage] = React.useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:39219/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
       
        
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const responseData = await response.json();
      const { statusCode, message } = responseData;

      if (statusCode === 1) {
                toast.success(message);
    toggleMode();

      } else {
        toast.warning(message);
      }

      // Reset form after successful submission
      setFormData({
        userId: 0,
        user_Name: '',
        user_Email: '',
        address: '',
        country_Id: '',
        state_Id: '',
        district_Id: '',
        mobile_No: '',
        password: '',
        rememberMe: true,
        createdDate: new Date().toISOString(),
        modifiedDate: new Date().toISOString(),
        isDeleted: false,
      });
    } catch (error) {
      console.error('Error submitting form:', error);
     // setToasterMessage({ type: 'error', message: 'Failed to submit form. Please try again.' });
    }
  };

  return (
    <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Login" className="btn solid" />
          </form>
          <form onSubmit={handleSubmit} className="sign-up-form">
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="user_Name"
                value={formData.user_Name}
                onChange={handleChange}
                placeholder="Username"
              />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                name="user_Email"
                value={formData.user_Email}
                onChange={handleChange}
                placeholder="Email"
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
            </div>
            <input type="submit" className="btn" value="Sign up" />
          </form>
          {/* {toasterMessage && (
            <div className={toasterMessage.type === 'success' ? 'toaster-success' : 'toaster-error'}>
              {toasterMessage.message}
            </div>

          )} */}
         
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>Join Us Today, Stay Ahead Tomorrow: Sign Up and Simplify Expiry Tracking!</p>
            <button className="btn transparent" onClick={toggleMode}>
              Sign up
            </button>
          </div>
          <img src="Image/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>Stay Fresh, Stay Informed: Your Expiry Date Tracker Online!</p>
            <button className="btn transparent" onClick={toggleMode}>
              Sign in
            </button>
          </div>
          <img src="https://storyset.com/illustration/login/amico" className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      <ToastContainer />
      <UserForm />
    </div>
  );
}

export default App;
