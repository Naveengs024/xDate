import React, { useState,useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import { Redirect } from 'react-router-dom';

import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

function UserForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [redirectTo, setRedirectTo] = useState(null);
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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

  const [loginData, setLoginData] = React.useState({
    user_Name: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:39219/Login/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }
      const responseData = await response.json();
      const { Token } = responseData;

      // Store the token in localStorage
      localStorage.setItem('token', Token);

      console.log('Login successful');
      setIsAuthenticated(true); // Set authentication state to true
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Check localStorage for token on component mount
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  if (isAuthenticated) {
    return <Redirect to="/Main" />;
  }

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
    }
  };

  const emailvalidation = async (e) => {
    e.preventDefault();
    try {
      const queryString = `?user_Email=${formData.user_Email}`;
      const response = await fetch(`http://localhost:39219/Login/GetUserEmailValidation${queryString}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const responseData = await response.json();
      const { statusCode, message } = responseData;

      if (statusCode === 2) {
        Swal.fire({
          title: message,
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          icon: 'warning'
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className={`container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleLogin} className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                name="user_Name"
                value={loginData.user_Name}
                onChange={handleLoginChange}
                placeholder="Username"
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                placeholder="Password"
              />
              <span>
                <i
                  id="toggler"
                  className={showPassword ? 'far fa-eye-slash' : 'far fa-eye'}
                  onClick={togglePasswordVisibility}
                ></i>
              </span>
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
                onBlur={emailvalidation}
                placeholder="Email"
              />
            </div>
            <div className="input-field">
              <i className="fa fa-lock"></i>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                id="password"
              />
              <span>
                <i
                  id="toggler"
                  className={showPassword ? 'far fa-eye-slash' : 'far fa-eye'}
                  onClick={togglePasswordVisibility}
                ></i>
              </span>
            </div>
            <input type="submit" className="btn" value="Sign up" />
          </form>
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
    <Router>
      <div>
        <ToastContainer />
        <UserForm />
        
      </div>
    </Router>
  );

}

export default App;
