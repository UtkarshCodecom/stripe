// src/Success.js
import React from 'react';
import './Success.css';

const Success = () => {
  return (
    <div className="success-page">
      <div className="success-message">
        <h1>Success!</h1>
        <p>Your payment was completed successfully.</p>
        <div className="checkmark-container">
          <div className="checkmark"></div>
        </div>
      </div>
    </div>
  );
};

export default Success;
