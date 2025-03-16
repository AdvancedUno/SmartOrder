// src/pages/OrderConfirmationPage.js

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

export default function OrderConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { orderId, orderNumber } = location.state || {};

  return (
    <Box sx={{ p: 2, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Thank you for your order!
      </Typography>
      {orderId && (
        <Typography variant="body1" gutterBottom>
          Your Order ID: <strong>{orderId}</strong>
        </Typography>
      )}
      {orderNumber && (
        <Typography variant="body1" gutterBottom>
          Your Order Number: <strong>{orderNumber}</strong>
        </Typography>
      )}
      <Button variant="contained" onClick={() => navigate('/')}>
        Back to Home
      </Button>
    </Box>
  );
}
