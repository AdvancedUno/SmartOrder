import React, { useEffect, useState } from 'react';
import { fetchStoreItems } from '../services/apiService';
import StoreItemCard from '../components/StoreItemCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function StorePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // setItems([
  //   {
  //     id: 1,
  //     name: 'Apple',
  //     store: ['Walmart', "Costco"],
  //     path: "../../../public/img/apple.jpg",
  //     price: 0.5,
  //   },{id: 2,
  //     name: 'Banana',
  //     store: ['Walmart', "Costco"],
  //     path: "../../../public/img/banana.jpg",
  //     price: 0.5,
  //   }
  // ]);

  useEffect(() => {
    async function getItems() {
      try {
        const data = await fetchStoreItems();
        setItems(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getItems();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Available Grocery Items
      </Typography>
      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid item key={item.id}>
            <StoreItemCard item={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
