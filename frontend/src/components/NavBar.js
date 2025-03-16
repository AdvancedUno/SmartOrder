// src/components/NavBar.js
import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";

export default function NavBar() {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const { token, userName, logout } = useContext(AuthContext);

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AppBar position="static">
      <Toolbar>
        {/* App Title */}
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Smart Order
        </Typography>

        {/* Cart / Order Button */}
        <IconButton color="inherit" onClick={() => navigate("/cart")}>
          <ShoppingCartIcon />
          {cartItemCount > 0 && (
            <Typography variant="body2" sx={{ ml: 1 }}>
              {cartItemCount} {/* Shows number of cart items */}
            </Typography>
          )}
        </IconButton>

        {cartItemCount > 0 && (
          <Button color="inherit" onClick={() => navigate("/checkout")}>
            Order
          </Button>
        )}

        {/* If logged in, show "My Orders" and Logout */}
        {token ? (
          <>
            <Button color="inherit" onClick={() => navigate("/my-orders")}>
              My Orders
            </Button>
            <Button color="inherit" onClick={() => { logout(); navigate("/login"); }}>
              Logout ({userName})
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={() => navigate("/login")}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
