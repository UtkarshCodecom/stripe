// src/Payment.js
import React, { useState } from 'react';
import axios from 'axios';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import Success from './Success';
import './Payment.css';

const Payment = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [success, setSuccess] = useState(false);
  const [amount, setAmount] = useState('');

  const handlePayment = async (event) => {
    event.preventDefault();

    const response = await axios.post(
      `/api/pay`,
      { amount: parseInt(amount) * 100 } // Convert to cents
    );

    if (response.status === 200) {
      const confirmPayment = await stripe.confirmCardPayment(
        response.data.client_secret,
        {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              // You can include billing details if required
              // name: 'Customer Name',
              // email: 'customer@example.com',
            },
          },
        }
      );

      console.log(confirmPayment);

      if (confirmPayment.error) {
        alert(confirmPayment.error.message);
      } else if (confirmPayment.paymentIntent.status === "succeeded") {
        setSuccess(true);
      }
    }
  }

  return (
    <div className="payment-container">
      {success ? (
        <Success />
      ) : (
        <form onSubmit={handlePayment} className="payment-form">
          <h2>Payment Details</h2>
          <div className="form-group">
            <label>Amount</label>
            <input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="amount-input"
              placeholder="Enter amount"
              required
            />
          </div>
          <div className="form-group">
            <label>Card Number</label>
            <CardNumberElement className="card-element" />
          </div>
          <div className="form-group">
            <label>Expiry Date</label>
            <CardExpiryElement className="card-element" />
          </div>
          <div className="form-group">
            <label>CVC</label>
            <CardCvcElement className="card-element" />
          </div>
          <button className="payment-button">Confirm Payment</button>
        </form>
      )}
    </div>
  );
}

export default Payment;
