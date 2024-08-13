// src/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import InputField from '../elements/InputField';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    postCode: '',
    address: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5500/signup',
        formData
      );
      alert('Signup successful, please login.');
      navigate('/login'); // Redirect to login after successful signup
    } catch (error) {
      console.error(
        'Signup error:',
        error.response ? error.response.data : error
      );
      alert('Error during signup.');
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
              label={'Email'}
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              handleChange={handleChange}
              required
            />
            <InputField
              label={'Password'}
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              handleChange={handleChange}
              required
            />
            <InputField
              label={'Full Name'}
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              handleChange={handleChange}
              required
            />
           
            <InputField
              label={'Postal Code'}
              type="text"
              name="postCode"
              placeholder="Postal Code"
              value={formData.postCode}
              handleChange={handleChange}
              required
            />
           
            <InputField
              label={'Address'}
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              handleChange={handleChange}
              required
            />

            <button
              type="submit"
              className="btn btn-primary my-4"
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
