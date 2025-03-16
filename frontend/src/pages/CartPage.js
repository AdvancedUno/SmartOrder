import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { 
  List, ListItem, ListItemText, Button, Typography, Box, IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleQuantityChange = (itemId, newQty) => {
    if (newQty < 1) return;
    updateQuantity(itemId, newQty);
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <List>
          {cartItems.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={`${item.name} (Store: ${item.store})`}
                //secondary={`Price: $${item.price.toFixed(2)}`}
              />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button 
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                >
                  -
                </Button>
                <Typography>{item.quantity}</Typography>
                <Button
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                >
                  +
                </Button>
                <IconButton onClick={() => removeFromCart(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
          ))}
        </List>
      )}
      {/* <Typography variant="h6" sx={{ mt: 2 }}>
        Total: ${totalPrice.toFixed(2)}
      </Typography> */}
      <Button 
        variant="contained" 
        onClick={handleCheckout} 
        sx={{ mt: 2 }} 
        disabled={cartItems.length === 0}
      >
        Proceed to Checkout
      </Button>
    </Box>
  );
}
