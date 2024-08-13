import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputField from '../elements/InputField';

const ItemDetails = () => {
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5500/item/${id}`);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item details', error);
      }
    };

    fetchItemDetails();
  }, [id]);

  const handleQuantityChange = (increment) => {
    setQuantity((prevQuantity) => {
      if (increment) {
        return prevQuantity + 1;
      }
      return prevQuantity > 1 ? prevQuantity - 1 : 1;
    });
  };

  const handleAddToCart = async () => {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      alert('Please log in to add items to the cart.');
      navigate('/login');
      return;
    }

    try {
      await axios.post('http://localhost:5500/cart', {
        userId,
        itemId: id,
        qty: quantity,
      });
      alert('Item added to cart!');
    } catch (error) {
      console.error('Error adding item to cart', error);
      alert('Failed to add item to cart.');
    }
  };

  //full page loading spinner add opacity to the spinner
  if (!item) {
    return (
      <div className="d-flex justify-content-center mt-5 align-items-center">
        <div
          className="spinner-border text-primary"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="container text-center">
      <div className="row mt-4">
        <div className="col-md-6 col-sm-12 mb-4">
          <img
            src={item.photo.includes("https") ? item.photo : "/"+item.photo}
            alt={item.name}
            className='rounded-2 img-fluid'
            width={400}
            height={400}
          />
        </div>
        <div className="col-md-6 col-sm-12 text-start">
          <h2>{item.name}</h2>
          <p>Price: £{item.price}</p>
          <div className="d-flex align-items-center mb-3">
            <button
              className="btn btn-primary"
              style={styles.button}
              onClick={() => handleQuantityChange(false)}
            >
              -
            </button>
            <InputField
              type="text"
              value={quantity}
              style={styles.input}
              readOnly
            />
            <button
              className="btn btn-primary"
              style={styles.button}
              onClick={() => handleQuantityChange(true)}
            >
              +
            </button>
          </div>
          <button
            className="btn btn-primary"
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  button: {
    margin: '0 5px',
  },
  input: {
    textAlign: 'center',
    width: '50px',
  },
};

export default ItemDetails;
