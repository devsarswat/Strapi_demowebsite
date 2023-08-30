import React, { useEffect, useContext, useState } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom';
import { ContextApi } from '../Routs/ContextApi';
import axios from 'axios';
import Config from '../Config';


const ProductInfo = () => {
  const { selectproduct, setselectproduct, Token, isLogin} = useContext(ContextApi);
  const [product, setProduct] = useState(null);
  const [storedProductId, setStoredProductId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProductId = localStorage.getItem("productid");
    if (selectproduct === null) {
      setselectproduct(parseInt(storedProductId, 10));
    }
    setStoredProductId(storedProductId); 
  }, [selectproduct, setselectproduct]);

  useEffect(() => {
    if (selectproduct !== null) {
      const fetchProductDetails = () => {
        axios
          .get(
            `http://localhost:1337/api/products/${selectproduct}?populate=*`,
            {
              headers: {
                Authorization: `Bearer ${Config.apikeytocken}`,
              },
            }
          )
          .then((response) => {
            setProduct(response.data.data);
          })
          .catch((error) => {
            console.error('Error fetching product details:', error);
          });
      };

      fetchProductDetails();
    }
  }, [selectproduct]);


const handleBuyNow = (productId) => {
  navigate('/checkout', { state: { storedProductId } });
};
  
  const handleAddToCart = async () => {
    if(isLogin){
    try {
      const response = await axios.get(`http://localhost:1337/api/products/${storedProductId}?populate=*`, {
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
  

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <Image
            src={`${'http://localhost:1337'}${product.attributes.image_url.data.attributes.url}`}
            alt={product.attributes.name}
            fluid
          />
        </Col>
        <Col md={6}>
          <h2>{product.attributes.name}</h2>
          <p>{product.attributes.description}</p>
          <p>Price: ₹ {product.attributes.price}</p>
          <p>Origin: {product.attributes.origin}</p>
          <p>Strength: {product.attributes.strength}</p>
          <Button variant="primary" onClick={handleBuyNow}>
            Buy Now
          </Button>{' '}
          <Button variant="success" onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductInfo;
