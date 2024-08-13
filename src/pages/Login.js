// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import InputField from '../elements/InputField';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5500/login',
        credentials
      );
      if (response.data.userId) {
        login(response.data.userId);
        navigate('/');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4">
            <form
              onSubmit={handleSubmit}
              className="bg-light p-4 rounded-2 mt-5 shadow-md"
            >
              <InputField
                label="Email"
                type="email"
                name="email"
                value={credentials.email}
                handleChange={handleChange}
                required
              />

              <InputField
                label="Password"
                type="password"
                name="password"
                value={credentials.password}
                handleChange={handleChange}
                placeholder="Password"
                required
              />

              <button
                type="submit"
                className="btn btn-primary my-4"
              >
                Login
              </button>
              <br />
              <br />
              <Link to="/signup">Don't have an account? Sign up</Link>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Login;
