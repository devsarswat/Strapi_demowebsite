import React, { useEffect, useContext, useState } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { ContextApi } from '../Routs/ContextApi';
import axios from 'axios';
import Config from '../Config';

const ProductInfo = () => {
  const { selectproduct, setselectproduct } = useContext(ContextApi);
  const [product, setProduct] = useState(null);
  const [storedProductId, setStoredProductId] = useState(null);

  useEffect(() => {
    const storedProductId = localStorage.getItem("productid");
    if (selectproduct === null) {
      setselectproduct(parseInt(storedProductId, 10));
    }
    setStoredProductId(storedProductId); // Save the storedProductId in state
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

  const handleBuyNow = () => {
    // Implement your Buy Now logic here
  };

  const handleAddToCart = async () => {
    try {
      const response = await axios.get(`http://localhost:1337/api/products/${storedProductId}?populate=*`, {
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
