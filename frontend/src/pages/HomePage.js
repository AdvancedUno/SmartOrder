// src/pages/HomePage.js

import React, { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function HomePage() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext); // Check if the user is logged in

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        bgcolor: '#f5f5f5',
        p: 4,
      }}
    >
      {/* Branding Title */}
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Smart Order
      </Typography>

      {/* Description */}
      <Typography variant="h6" paragraph sx={{ maxWidth: 600 }}>
        Shop your favorite items from multiple stores, and we'll optimize your order to get the best prices and meet store minimums!
      </Typography>

      {/* Call to Action */}
      <Button variant="contained" color="primary" onClick={() => navigate('/store')} sx={{ mb: 2, px: 4 }}>
        Shop Now
      </Button>

      {/* Show "View Orders" if logged in, otherwise show "Login" button */}
      {token ? (
        <Button variant="outlined" color="secondary" onClick={() => navigate('/my-orders')}>
          View My Orders
        </Button>
      ) : (
        <Button variant="outlined" color="secondary" onClick={() => navigate('/login')}>
          Login to View Orders
        </Button>
      )}
    </Box>
  );
}
