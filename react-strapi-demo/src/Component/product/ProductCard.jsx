import React, {  useEffect, useContext } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'; // Import Button component
import Config from '../Config';
import { ContextApi } from '../Routs/ContextApi';

const ProductCard = () => {
  const { products, setProducts } = useContext(ContextApi);
 
  useEffect(() => {
    axios
      .get('http://localhost:1337/api/products?populate=*', {
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

  const handleAddToCart = (productId) => {
    // Implement logic to add product to cart
    console.log(`Added product ${productId} to cart`);
  };

  const handleBuyNow = (productId) => {
    // Implement logic to initiate the buy process
    console.log(`Buy now: ${productId}`);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
      {products.map((product) => (
        <Card key={product.id} sx={{ width: 345 }}>
          {product.attributes.image_url && (
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
              Origin: {product.attributes.origin}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Strength: {product.attributes.strength}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Price: {product.attributes.price}
            </Typography>
            <Button variant="contained" className='mx-2 my-2' onClick={() => handleAddToCart(product.id)}>Add to Cart</Button>
            <Button variant="contained" color="primary" onClick={() => handleBuyNow(product.id)}>Buy Now</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductCard;
