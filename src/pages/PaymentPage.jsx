import React, { useState } from 'react';
import InputField from '../elements/InputField';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//import './PaymentPage.css';

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const navigate = useNavigate();
  const userId = sessionStorage.getItem('userId');
  const handlePayment = async () => {
    //all fields are required
    if (
      cardNumber === '' ||
      expiryDate === '' ||
      cvv === '' ||
      cardName === ''
    ) {
      alert('Please fill all fields');
      return;
    }

    try {
      await axios.post('http://localhost:5500/order', { userId });
      navigate('/my-order');
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Payment Details</h2>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4">
            <div className="mb-3">
              <label
                htmlFor="cardName"
                className="form-label"
              ></label>
              <InputField
                label="Cardholder Name"
                type="text"
                className="form-control"
                id="cardName"
                value={cardName}
                handleChange={(e) => setCardName(e.target.value)}
                placeholder="Enter cardholder name"
                required
                showValid
                isValid={cardName !== ''}
                feedback={cardName !== '' ? 'Please enter cardholder name' : ''}
              />
            </div>
            <div className="mb-3">
              <InputField
                label="Card Number"
                type="number"
                className="form-control"
                id="cardNumber"
                value={cardNumber}
                handleChange={(e) => setCardNumber(e.target.value)}
                placeholder="Enter card number"
                required
                showValid
                isValid={cardNumber !== '' && cardNumber.length === 16}
                feedback="Please valid 16 digit enter card number"
              />
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <InputField
                  type="text"
                  label="Expiry Date"
                  className="form-control"
                  id="expiryDate"
                  value={expiryDate}
                  handleChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                  required
                  showValid
                  isValid={
                    expiryDate !== '' &&
                    expiryDate.length === 5 &&
                    expiryDate.includes('/')
                  }
                  feedback="Please valid enter expiry date"
                />
              </div>
              <div className="col-md-6 mb-3">
                <InputField
                  label={'CVV'}
                  type="number"
                  className="form-control"
                  id="cvv"
                  value={cvv}
                  handleChange={(e) => setCvv(e.target.value)}
                  placeholder="Enter CVV"
                  required
                  showValid
                  isValid={cvv !== '' && cvv.length === 3}
                  feedback="Please enter valid 3 digit CVV"
                />
              </div>
            </div>
            <button
              className="btn btn-primary w-100 mt-3"
              onClick={handlePayment}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
