import React, { useEffect, useContext, useState } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { ContextApi } from '../Routs/ContextApi';
import axios from 'axios';
import Config from '../Config';

const ProductInfo = () => {
  const { selectproduct, setselectproduct } = useContext(ContextApi);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const storedProductId = localStorage.getItem("id");
    if (selectproduct==null) {
      setselectproduct(parseInt(storedProductId, 10)); 
    }
  }, [selectproduct,setselectproduct]);

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
    
  };

  const handleAddToCart = () => {
    
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
