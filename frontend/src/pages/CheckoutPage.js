// src/pages/CheckoutPage.js

import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { placeOrder } from '../services/apiService';
import {
  Box,
  Typography,
  TextField,
  Button
} from '@mui/material';

export default function CheckoutPage() {
  const { cartItems, clearCart } = useContext(CartContext);
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [customerRequest, setCustomerRequest] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      const result = await placeOrder(cartItems, customerName, customerRequest, address);

      console.log(result);
      
      clearCart();
      navigate('/order-confirmation', { state: { orderId: result.orderId, orderNumber: result.orderNumber } });
    } catch (error) {
      console.error(error);
      alert("Order placement failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Checkout
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
        <TextField
          label="Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder='Uno'
        />
        
        <TextField
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder='Washington DC'
        />
        <TextField
          label="Any Request"
          value={customerRequest}
          onChange={(e) => setCustomerRequest(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handlePlaceOrder}
          disabled={!customerName || !address || loading}
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </Button>
      </Box>
    </Box>
  );
}
