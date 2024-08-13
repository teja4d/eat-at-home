// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import InputField from '../elements/InputField';
import AlertBanner from '../elements/AlertBanner';

const ChangePassword = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showError, setShowError] = useState({
    show: false,
    message: '',
  });
  const { login } = useAuth();
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //verify if the new password and confirm password are the same
    if (credentials.newPassword !== credentials.confirmPassword) {
      setShowError({
        show: true,
        message: 'Passwords do not match',
      });
      return;
    }

    //password should be 6 char min

    if (credentials.newPassword.length < 6) {
      setShowError({
        show: true,
        message: 'Password should be atleast 6 characters',
      });
      return;
    }

    try {
      const response = await axios.put(
        'http://localhost:5500/change-password',
        {
          userId,
          oldPassword: credentials.oldPassword,
          newPassword: credentials.newPassword,
        }
      );
      
      if (response.status === 200) {
        console.log('Password changed successfully');
        alert('Password changed successfully');
        login(userId);
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="bg-light  shadow-md col-md-4 p-4 rounded-2 mt-5">
          <form
            onSubmit={handleSubmit}
            className=""
          >
            <InputField
              placeholder={'Old Password'}
              label="Old Password"
              type="password"
              name="oldPassword"
              value={credentials.oldPassword}
              handleChange={handleChange}
              required
              isValid={credentials.oldPassword.length > 5}
              feedback="Password should be atleast 6 characters"
              showValid={false}
            />

            <InputField
              label="New Password"
              type="password"
              name="newPassword"
              value={credentials.newPassword}
              handleChange={handleChange}
              placeholder="Password"
              required
              isValid={!showError.show}
              feedback={showError.message}
            />

            <InputField
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={credentials.confirmPassword}
              handleChange={handleChange}
              placeholder="Password"
              isValid={!showError.show}
              feedback={showError.message}
              required
            />
            <button
              type="submit"
              className="btn btn-primary my-4"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
