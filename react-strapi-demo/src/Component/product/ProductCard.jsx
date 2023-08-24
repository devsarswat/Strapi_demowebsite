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
  const { products, setProducts, setselectproduct } = useContext(ContextApi);
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
  }, [setProducts]);

  // const handleAddToCart = async (productId) => {
  //   try {
  //     const response = await axios.get(`http://localhost:1337/api/products/${productId}?populate=*`, {
  //       headers: {
  //         Authorization: `Bearer ${Config.apikeytocken}`,
  //       },
  //     });

  //     const productData = response.data.data.attributes;
  //     const productImage = response.data.data.attributes.image_url.data.attributes.url;

  //     const imageResponse = await axios.get(`http://localhost:1337${productImage}`, {
  //       responseType: 'arraybuffer',
  //     });
  //     const Userid=localStorage.getItem("id")
  //     console.log("userid",Userid)
  //     const formData = new FormData();
  //     formData.append('data', JSON.stringify(productData));
  //     const imageBlob = new Blob([imageResponse.data], { type: 'image/jpeg' });
  //     formData.append('files.image_url', imageBlob, '1691674931131.JPEG');

  //     await axios.post('http://localhost:1337/api/carts', formData, {
  //       headers: {
  //         Authorization: `Bearer 10dd78141d0a54023889812ea4f80ab4ab3faa94713f44dd7a4569981650233d050f71fbd89aec9735953d9ce2b238bc17324de35af372bc2a51fe6b152332fc4dcf64ba2f1a39c26ae21567b08024324e0ab12148c8e0c345d9531a94b5b9d5b41744dbb1798149053211890139bc0f00e7a68fecb6e95174f8e9cd6e1980a0`,
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     });

  //     console.log('Added to cart successfully');
  //   } catch (error) {
  //     console.error('Error adding to cart:', error);
  //   }
  // };

  const handleAddToCart = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:1337/api/products/${productId}?populate=*`, {
        headers: {
          Authorization: `Bearer ${Config.apikeytocken}`,
        },
      });
  
      const productData = response.data.data.attributes;
      const productImage = response.data.data.attributes.image_url.data.attributes.url;
  
      const imageResponse = await axios.get(`http://localhost:1337${productImage}`, {
        responseType: 'arraybuffer',
      });
      
      const User_id = localStorage.getItem("id");
      productData.Userid = User_id;
  
      const formData = new FormData();
      formData.append('data', JSON.stringify(productData));
      
      const imageBlob = new Blob([imageResponse.data], { type: 'image/jpeg' });
      formData.append('files.image_url', imageBlob, '1691674931131.JPEG');
  
      await axios.post('http://localhost:1337/api/carts', formData, {
        headers: {
          Authorization: `Bearer 10dd78141d0a54023889812ea4f80ab4ab3faa94713f44dd7a4569981650233d050f71fbd89aec9735953d9ce2b238bc17324de35af372bc2a51fe6b152332fc4dcf64ba2f1a39c26ae21567b08024324e0ab12148c8e0c345d9531a94b5b9d5b41744dbb1798149053211890139bc0f00e7a68fecb6e95174f8e9cd6e1980a0`,
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Added to cart successfully');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };
  
  const handleBuyNow = async (productId) => {
    try {
      const response = await axios.get(`http://localhost:1337/api/products/${productId}?populate=*`, {
        headers: {
          Authorization: `Bearer ${Config.apikeytocken}`,
        },
      });

      const productData = response.data.data.attributes;

      const defaultValues = {
        email: 'vasudev@gmail.com',
        orderid: 'order-55',
        paymentinfo: {
          cardNumber: '12345',
          expiryDate: '12/24',
          paymentMethod: 'Credit Card',
        },
        address: '123 Main St, City',
        name: 'John Doe',
        transactionid: 'T98777654',
        amount: 658,
        status: 'Completed',
      };

      const orderData = {
        ...defaultValues,
        products: [
          {
            price: productData.price,
            quantity: 1,
            productId: productData.id,
            productName: productData.name,
          },
        ],
      };

      await axios.post('http://localhost:1337/api/orders', { data: orderData }, {
        headers: {
          Authorization: `Bearer f72266a0bf0a7fce0537c11ce970f42473b7ff76bc10b26284d64e623b6eee01ec75caff7b16913a85ee96f1568149f6c63dcb76987809727fe75d9daae45d400c48108c10d743ccb6f53053725d856f3b91f26e7e03646e36920b54abff7d100cb7a2979ae071f60e19c09534d7ed7dcbcc1f9a06e1bdc520ea02a9db0dc9ee`,
        },
      });

      console.log('Buy Now success');
    } catch (error) {
      console.error('Error during Buy Now:', error);
    }
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
              height="140"
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
