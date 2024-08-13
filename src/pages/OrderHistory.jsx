import axios from 'axios';
import React, { useEffect, useState } from 'react';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5500/orders/${userId}`
        );

        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };
    fetchOrders();
  }, [userId]);
  console.log(orders);

  return (
    <div className="container m-5 mx-auto">
      <h2 className="mb-4 text-center">Order History</h2>
      <div className="list-group">
        {orders.map((order) => (
          <div
            key={order._id}
            className="list-group-item border-0"
          >
            <h5 className="d-flex justify-content-between align-items-center">
              <span>
                Order Date: {new Date(order.orderDate).toLocaleDateString()}
              </span>
            </h5>
            <h5 className='text-secondary'>
                {order.orderNumber}
            </h5>
            <div className="mt-3">
              <ul className="list-group">
                {order.orderDetails.map((detail, index) => (
                  <li
                    key={index}
                    className="list-group-item border-0"
                  >
                    <div className="row">
                      <div className="col-md-2">
                        <img
                          src={detail.itemDetails.photo}
                          alt={detail.itemDetails.name}
                          className="img-fluid rounded-circle"
                          width={150}
                          height={150}
                        />
                      </div>
                      <div className="col-md-10">
                        <h6 className='fs-4'>{detail.itemDetails.name}</h6>
                        <p className='text-secondary'>Price: ${detail.itemDetails.price.toFixed(2)}</p>
                        <p className='text-secondary'>Quantity: {detail.quantity}</p>
                        <p className='text-black border-light'>
                          Total Cost: $
                          {(detail.itemDetails.price * detail.quantity).toFixed(
                            2
                          )}
                        </p>
                      </div>
                    </div>
                    <hr></hr>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderHistory;
