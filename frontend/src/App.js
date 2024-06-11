import React, { useState, useEffect } from 'react';
import axios from "axios";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Payment from './Payment';
import './App.css';

function App() {
  const [stripePromise, setStripePromise] = useState(null);

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/stripeapikey");
    setStripePromise(loadStripe(data.stripeApiKey));
  }

  useEffect(() => {
    getStripeApiKey();
  }, []);

  return (
    stripePromise && (
      <Elements stripe={stripePromise}>
        <Payment />
      </Elements>
    )
  );
}

export default App;
