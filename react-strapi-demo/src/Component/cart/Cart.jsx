import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardMedia, CardContent, Typography ,Button} from '@mui/material';

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    axios
      .get('http://localhost:1337/api/carts?populate=*', {
        headers: {
          Authorization: `Bearer f72266a0bf0a7fce0537c11ce970f42473b7ff76bc10b26284d64e623b6eee01ec75caff7b16913a85ee96f1568149f6c63dcb76987809727fe75d9daae45d400c48108c10d743ccb6f53053725d856f3b91f26e7e03646e36920b54abff7d100cb7a2979ae071f60e19c09534d7ed7dcbcc1f9a06e1bdc520ea02a9db0dc9ee`,
        },
      })
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  useEffect(() => {
    let calculatedTotalPrice = 0;
    for (const product of products) {
      if (product.attributes.price) {
        calculatedTotalPrice += product.attributes.price;
      }
    }
    setTotalPrice(calculatedTotalPrice);
  }, [products]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
      {products.map((product) => (
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
            <Button variant="contained" color="error" className='mx-2 my-2'>
              Remove from Cart
            </Button>
          </CardContent>
        </Card>
      ))}
      <div style={{ marginTop: '20px' }}>
        <Typography variant="h6">Cart Summary</Typography>
        <Typography>Total Items:  {products.length}</Typography>
        <Typography>Total Price: ₹ {totalPrice}</Typography>
        <Button variant="contained" color="success" className='mx-2 my-2'>
              Place Order
            </Button>
      </div>
    </div>
  );
};

export default Cart;
