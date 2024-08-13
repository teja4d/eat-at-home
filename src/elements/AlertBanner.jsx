import React, { useEffect } from 'react';

const AlertBanner = ({ message }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const alertBanner = document.getElementById('alertBanner');
      if (alertBanner) {
        alertBanner.classList.remove('show');
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div
      id="alertBanner"
      className="text-center p-2 alert alert-danger fade show"
      role="alert"
    >
      {message}
    </div>
  );
};

export default AlertBanner;
