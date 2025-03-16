// src/pages/UserOrdersPage.js

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { fetchUserOrders } from "../services/authService";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
  Alert,
  CircularProgress
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function UserOrdersPage() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const getOrders = async () => {
      try {
        setLoading(true);
        const data = await fetchUserOrders(token);
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, [token, navigate]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        My Orders
      </Typography>
      {orders.length === 0 ? (
        <Typography>No orders found.</Typography>
      ) : (
        <List>
          {orders.map((order) => (
            <Paper elevation={3} sx={{ mb: 2, p: 2 }} key={order.orderId}>
              {/* Order Summary */}
              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <ListItemText
                    primary={`Order #${order.orderNumber}`}
                    secondary={`Total: $${order.totalPrice.toFixed(2)} | Created at: ${order.createdAt}`}
                  />
                </AccordionSummary>

                {/* Expanded Order Details */}
                <AccordionDetails>
                  <Typography variant="subtitle1" gutterBottom>
                    Order Items:
                  </Typography>
                  <List>
                    {order.orderItems.map((item) => (
                      <ListItem key={item.id} sx={{ pl: 2 }}>
                        <ListItemText
                          primary={`${item.itemName} (${item.quantity}x)`}
                          secondary={`Store: ${item.storeName} | Unit Price: $${item.unitPrice.toFixed(2)} | Subtotal: $${item.subtotal.toFixed(2)}`}
                        />
                      </ListItem>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            </Paper>
          ))}
        </List>
      )}
    </Box>
  );
}
