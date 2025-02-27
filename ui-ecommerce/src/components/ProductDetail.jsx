import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Button, CardMedia } from '@mui/material';
import axios from 'axios';
import { useCartStore } from '../cartStore';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box p={4} display="flex" flexDirection="column" alignItems="center">
      <CardMedia
        component="img"
        image={product.image}
        alt={product.title}
        style={{ width: '300px', height: '300px', objectFit: 'contain', marginBottom: '20px' }}
      />
      <Typography variant="h4" gutterBottom>
        {product.title}
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        ${product.price}
      </Typography>
      <Typography variant="body1" paragraph>
        {product.description}
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        style={{ backgroundColor: '#FF4081' }}
        onClick={() => addToCart(product)} // Add to Cart functionality
      >
        Add to Cart
      </Button>
    </Box>
  );
};

export default ProductDetail;
