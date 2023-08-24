import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    axios
      .get('http://localhost:1337/api/carts?populate=*', {
        headers: {
          Authorization: `Bearer 10dd78141d0a54023889812ea4f80ab4ab3faa94713f44dd7a4569981650233d050f71fbd89aec9735953d9ce2b238bc17324de35af372bc2a51fe6b152332fc4dcf64ba2f1a39c26ae21567b08024324e0ab12148c8e0c345d9531a94b5b9d5b41744dbb1798149053211890139bc0f00e7a68fecb6e95174f8e9cd6e1980a0`,
        },
      })
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);
  const User_id = parseInt(localStorage.getItem("id"), 10);
  useEffect(() => {
    const filtered = products.filter(product => product.attributes.Userid === User_id);
    setFilteredProducts(filtered);
    
    let calculatedTotalPrice = 0;
    for (const product of filtered) {
      if (product.attributes.price) {
        calculatedTotalPrice += product.attributes.price;
      }
    }
    setTotalPrice(calculatedTotalPrice);
  }, [products,User_id]);

  const handleremove = (productId) => {
    axios
      .delete(`http://localhost:1337/api/carts/${productId}`, {
        headers: {
          Authorization: `Bearer 10dd78141d0a54023889812ea4f80ab4ab3faa94713f44dd7a4569981650233d050f71fbd89aec9735953d9ce2b238bc17324de35af372bc2a51fe6b152332fc4dcf64ba2f1a39c26ae21567b08024324e0ab12148c8e0c345d9531a94b5b9d5b41744dbb1798149053211890139bc0f00e7a68fecb6e95174f8e9cd6e1980a0`,
        },
      })
      .then(() => {
        console.log('Product Removed successfully');
        setFilteredProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
      {filteredProducts.map((product) => (
        <Card key={product.id} sx={{ width: 345 }}>
          {product.attributes.image_url && product.attributes.image_url.data && (
            <CardMedia
              component="img"
              alt={product.attributes.name}
              height="140"
              image={`${'http://localhost:1337'}${product.attributes.image_url.data.attributes.url}`}
            />
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.attributes.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.attributes.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: ₹ {product.attributes.price}
            </Typography>
            <Button variant="contained" color="error" className="mx-2 my-2" onClick={() => handleremove(product.id)}>
              Remove from Cart
            </Button>
          </CardContent>
        </Card>
      ))}
      <div style={{ marginTop: '20px' }}>
        <Typography variant="h6">Cart Summary</Typography>
        <Typography>Total Items: {filteredProducts.length}</Typography>
        <Typography>Total Price: ₹ {totalPrice}</Typography>
        <Button variant="contained" color="success" className="mx-2 my-2">
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default Cart;
