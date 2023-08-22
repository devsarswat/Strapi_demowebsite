import React, {  useEffect, useContext} from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'; 
import Config from '../Config';
import { ContextApi } from '../Routs/ContextApi';
import { useNavigate } from 'react-router-dom';


const ProductCard = () => {
  const { products, setProducts, setselectproduct } = useContext(ContextApi);
  const nevigat=useNavigate();
 
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
    console.log(`Added product ${productId} to cart`);

    axios
      .get(`http://localhost:1337/api/products/${productId}?populate=*`, {
        headers: {
          Authorization: `Bearer ${Config.apikeytocken}`,
        },
      })
      .then((response) => {
        const productData = response.data.data.attributes;
        console.log("productData",) 
        axios
          .post('http://localhost:1337/api/carts', {data:{...productData}}, {
            headers: {
              Authorization: `Bearer f72266a0bf0a7fce0537c11ce970f42473b7ff76bc10b26284d64e623b6eee01ec75caff7b16913a85ee96f1568149f6c63dcb76987809727fe75d9daae45d400c48108c10d743ccb6f53053725d856f3b91f26e7e03646e36920b54abff7d100cb7a2979ae071f60e19c09534d7ed7dcbcc1f9a06e1bdc520ea02a9db0dc9ee`,
            },
          })
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.error('Error adding to cart:', error);
          });
      })
      .catch((error) => {
        console.error('Error fetching product data:', error);
      });
  };
  

  const handleBuyNow = (productId) => {
    console.log(`Buy now: ${productId}`);
  };
  const handleclick=(productId)=>{
    setselectproduct(productId)
    nevigat('/productinfo')
    localStorage.setItem("id",productId)
  }

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
              onClick={()=>handleclick(product.id)}
            />
          )}
          <CardContent>
          <div onClick={()=>handleclick(product.id)}>
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
            </div>
            <Button variant="contained" color='success' className='mx-2 my-2' onClick={() => handleAddToCart(product.id)}>Add to Cart</Button>
            <Button variant="contained" color="primary" onClick={() => handleBuyNow(product.id)}>Buy Now</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductCard;
