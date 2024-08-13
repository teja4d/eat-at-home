import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useNavigate,
} from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';
import ItemDetails from './pages/ItemDetails';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyOrder from './pages/MyOrder';
import { useAuth } from './context/AuthContext';
import ChangePassword from './pages/ChangePassword';
import ShowCart from './pages/ShowCart/ShowCart';
import PaymentPage from './pages/PaymentPage';
import OrderHistory from './pages/OrderHistory';

const App = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Router>
      <div className="container">
        <header className="d-flex justify-content-between align-items-center py-3 border-bottom">
          <Link
            to="/"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <h1>Eat@Home</h1>
          </Link>
          <div>
            <Link
              to="/contact-us"
              style={{ textDecoration: 'none' }}
              className="px-2"
            >
              Contact Us
            </Link>
            <Link
              to="/about-us"
              style={{ textDecoration: 'none' }}
              className="px-2"
            >
              About Us
            </Link>
            {isAuthenticated ? (
              <Link
                to="/order-history"
                style={{ textDecoration: 'none' }}
                className="px-2"
              >
                Order History
              </Link>
            ) : null}
            {isAuthenticated ? (
              <Link
                to="change-password"
                style={{ textDecoration: 'none' }}
                className="px-2"
              >
                Change Password
              </Link>
            ) : null}
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="btn btn-sm btn-danger"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                style={{ textDecoration: 'none' }}
                className="px-2"
              >
                Login
              </Link>
            )}
            <Link
              to="/cart"
              className="px-2"
            >
              <img
                src="/images/cart.png"
                alt="Cart"
                style={{ height: '40px' }}
              />
            </Link>
          </div>
        </header>
      </div>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/about-us"
          element={<AboutUs />}
        />
        <Route
          path="/contact-us"
          element={<ContactUs />}
        />
        <Route
          path="/items/:id"
          element={<ItemDetails />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route
          path="/cart"
          element={<ShowCart />}
        />
        <Route
          path="/my-order"
          element={<MyOrder />}
        />
        <Route
          path="/change-password"
          element={<ChangePassword />}
        />
        <Route
          path="/payment"
          element={<PaymentPage />}
        />
        <Route
          path="/order-history"
          element={<OrderHistory />}
        />
      </Routes>
    </Router>
  );
};

export default App;
