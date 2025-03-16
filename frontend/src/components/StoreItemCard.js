import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { CartContext } from "../context/CartContext";

export default function StoreItemCard({ item }) {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(item);
  };

  return (
    <Card
      sx={{
        maxWidth: 200,
        m: 2,
        textAlign: "center",
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": { boxShadow: 6 },
      }}
    >
      
      <CardMedia
        component="img"
        height="140"
        image={`${item.path}`} 
        //alt={item.name}
        sx={{ objectFit: "contain", bgcolor: "#f8f8f8" }}
      />
      <CardContent>
        <Typography variant="h6" fontWeight="bold">
          {item.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Available in: {item.store.join(", ")}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddToCart}
          sx={{ mt: 1 }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
