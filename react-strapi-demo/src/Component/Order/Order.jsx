import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Config from '../Config';
// import { ContextApi } from '../Routs/ContextApi';

const Order = () => {
  const [ products, setProducts ] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:1337/api/orders?populate=*', {
        headers: {
          Authorization: `Bearer ${Config.apikeytocken}`,
        },
      })
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, [setProducts]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
      {products.map((product) => (
        <Card key={product.id} sx={{ width: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.attributes.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.attributes.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Origin: {product.attributes.origin}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Strength: {product.attributes.strength}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: ₹ {product.attributes.price}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Order;
