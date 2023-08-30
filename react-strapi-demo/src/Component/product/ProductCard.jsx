import React, { useEffect, useContext } from 'react';
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
  const { products, setProducts, setselectproduct, Token, isLogin} = useContext(ContextApi);
  const navigate = useNavigate();

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
  }, [setProducts,Token]);


  const handleAddToCart = async (productId) => {
    if(isLogin){
    try {
      const response = await axios.get(`http://localhost:1337/api/products/${productId}?populate=*`, {
        headers: {
          Authorization: `Bearer ${Config.apikeytocken}`,
        },
      });
  
      const productData = response.data.data.attributes;
      const productImage = response.data.data.attributes.image_url.data.attributes.url;
  
      const User_id = localStorage.getItem("id");
      productData.Userid = User_id;
      productData.quantity=1;
  
      const cartResponse = await axios.get('http://localhost:1337/api/carts', {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });
  
      const existingProduct = cartResponse.data.data.find(item =>
        item.attributes.name === productData.name
      );
  
      if (existingProduct) {
        existingProduct.attributes.quantity += 1;
        await axios.put(`http://localhost:1337/api/carts/${existingProduct.id}`, {data:{
          quantity: existingProduct.attributes.quantity,}
        }, {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        });
      } else {
        const formData = new FormData();
        formData.append('data', JSON.stringify(productData));
  
        const imageResponse = await axios.get(`http://localhost:1337${productImage}`, {
          responseType: 'arraybuffer',
        });
  
        const imageBlob = new Blob([imageResponse.data], { type: 'image/jpeg' });
        formData.append('files.image_url', imageBlob, '1691674931131.JPEG');
  
        await axios.post('http://localhost:1337/api/carts', formData, {
          headers: {
            Authorization: `Bearer ${Token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }
  
      console.log('Added to cart successfully');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  }
  else{
    navigate('/login')
  }
};

const handleBuyNow = (productId) => {
  navigate('/checkout', { state: { productId } });
};

  const handleclick = (productId) => {
    setselectproduct(productId);
    navigate('/productinfo');
    localStorage.setItem('productid', productId);
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
      {products.map((product) => (
        <Card key={product.id} sx={{ width: 345 }}>
          {product.attributes.image_url && (
            <CardMedia
              component="img"
              alt={product.attributes.name}
              height={140}
              image={`${'http://localhost:1337'}${product.attributes.image_url.data.attributes.url}`}
              onClick={() => handleclick(product.id)}
            />
          )}
          <CardContent>
            <div onClick={() => handleclick(product.id)}>
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
            <Button
              variant="contained"
              color="success"
              className="mx-2 my-2"
              onClick={() => handleAddToCart(product.id)}
            >
              Add to Cart
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleBuyNow(product.id)}
            >
              Buy Now
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductCard;
