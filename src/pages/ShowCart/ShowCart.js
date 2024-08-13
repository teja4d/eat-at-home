import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ShowCart.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import InputField from '../../elements/InputField';

const ShowCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      alert('Please log in to view your cart.');
      navigate('/login');
      return;
    }

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5500/cart/${userId}`
        );
        setCartItems(response.data);

        const total = response.data.reduce(
          (sum, item) => sum + item.qty * item.price,
          0
        );
        setTotalPrice(total.toFixed(2));
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [userId, navigate]);

  const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:5500/cart/${userId}/${itemId}`);
      const updatedCartItems = cartItems.filter(
        (item) => item.itemId !== itemId
      );
      setCartItems(updatedCartItems);

      const total = updatedCartItems.reduce(
        (sum, item) => sum + item.qty * item.price,
        0
      );
      setTotalPrice(total.toFixed(2));
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleUpdateQuantity = async (itemId, newQty) => {
    if (newQty < 1) return;

    try {
      await axios.put(`http://localhost:5500/cart/${userId}/${itemId}`, {
        qty: newQty,
      });
      const updatedCartItems = cartItems.map((item) =>
        item.itemId === itemId ? { ...item, qty: newQty } : item
      );
      setCartItems(updatedCartItems);

      const total = updatedCartItems.reduce(
        (sum, item) => sum + item.qty * item.price,
        0
      );
      setTotalPrice(total.toFixed(2));
    } catch (error) {
      console.error('Error updating item quantity:', error);
    }
  };

  const handleConfirmOrder = async () => {
    if (!userId) {
      alert('Please log in to confirm your order.');
      navigate('/login');
      return;
    }
    navigate('/payment');
  };

  return (
    <div className="container">
      <h2 className="text-start my-4">Your Cart</h2>
      <hr></hr>
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item.itemId}
              className="mb-3 bg-light p-3 rounded-3 position-relative mx-md-2"
            >
              <div className="row">
                <div className="col-5">
                  <img
                    src={item.photo}
                    className="rounded-circle p-2"
                    alt={item.name}
                    width={120}
                    height={120}
                  />
                </div>
                <div className="col-6">
                  <div className="card-body d-md-flex justify-content-between p-2">
                    <div className="d-flex justify-content-between align-items-start">
                      <p className="card-title mb-1 fs-4" style={{"width":"200px"}}>{item.name}</p>
                    </div>
                    <div  style={{ width: '120px' }} className="d-flex align-items-center mt-2 mt-sm-4 mt-md-0">
                      <button
                        className="btn btn-outline-secondary btn-sm me-2"
                        onClick={() =>
                          handleUpdateQuantity(item.itemId, item.qty - 1)
                        }
                      >
                        -
                      </button>
                      <InputField
                        type="number"
                        value={item.qty}
                        onChange={(e) =>
                          handleUpdateQuantity(
                            item.itemId,
                            parseInt(e.target.value)
                          )
                        }
                        min="1"
                       
                        small
                      />
                      <button
                        className="btn btn-outline-secondary btn-sm ms-2"
                        onClick={() =>
                          handleUpdateQuantity(item.itemId, item.qty + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <p className="card-text mt-2 mt-sm-4 mt-md-0">
                      £{item.price} x {item.qty}
                    </p>
                  </div>
                  <div className="col-1">
                    <button
                      className="btn btn-link  p-0 text-secondary position-absolute top-0 end-0 p-2 px-3"
                      onClick={() => handleRemoveItem(item.itemId)}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <hr></hr>
          <div className="text-end mx-md-2">
            <p className="text-secondary  fs-4">
              Total: <span className="text-black">£{totalPrice}</span>
            </p>
            <button
              className="btn btn-primary mt-3"
              onClick={handleConfirmOrder}
            >
              Confirm Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShowCart;
