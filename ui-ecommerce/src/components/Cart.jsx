import React from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCartStore } from "../cartStore";


const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCartStore();

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <List>
          {cart.map((item) => (
            <ListItem key={item.id} divider>
              <ListItemText
                primary={item.title}
                secondary={`Price: $${item.price}`}
              />
              <TextField
                type="number"
                label="Quantity"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                style={{ width: '80px', marginRight: '16px' }}
              />
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => removeFromCart(item.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
      {cart.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">
            Total: ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Cart;
