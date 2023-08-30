import React, { useState, useContext } from "react";
import { Button, TextField, Container } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  
import Config from '../Config'; 
import { ContextApi } from "../Routs/ContextApi"; 
import { useLocation } from 'react-router-dom';

const CheckoutPage=()=> {
  const location = useLocation();
  const { productId } = location.state || {};
  const [formData, setFormData] = useState({
    fullName: "",
    mobileNumber: "",
    Fulladdress: "",
  });

  const navigate = useNavigate();
  const { Token, user, isLogin } = useContext(ContextApi);  

  const handleFieldChange = (field, value) => {
    const newValue = field === "mobileNumber" ? parseInt(value) : value;

    setFormData((prevData) => ({
      ...prevData,
      [field]: newValue,
    }));
  };

  const handleBuyNow = async (productData, paymentId) => {
    try {
      const defaultValues = {
        email: user.email,
        orderid: `order-${Math.floor(Math.random() * 100)}`,
        paymentinfo: {
          cardNumber: '12345',
          expiryDate: '12/24',
          paymentMethod: 'Credit Card',
        },
        address: formData.Fulladdress,
        name: user.username,
        transactionid: paymentId,
        amount: productData.price,
        status: 'pending',
        full_name: formData.fullName,
        mobile_number: formData.mobileNumber,
      };

      const orderData = {
        ...defaultValues,
        products: [
          {
            price: productData.price,
            quantity: 1,
            productId: productData.id,
            productName: productData.name,
            productImage: productData.image_url.data.attributes.url,
          },
        ],
      };

      await axios.post('http://localhost:1337/api/orders', { data: orderData }, {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      });

      console.log('Buy Now success');
      navigate('/product');
    } catch (error) {
      console.error('Error during Buy Now:', error);
    }
  };

  const handlePayment = async () => {
    if (isLogin) {
      try {
        const response = await axios.get(`http://localhost:1337/api/products/${productId}?populate=*`, {
          headers: {
            Authorization: `Bearer ${Config.apikeytocken}`,
          },
        });

        const productData = response.data.data.attributes;
        
        const options = {
          key: 'rzp_test_iKGFGUDXBcQzQh', 
          amount: productData.price * 100, 
          currency: 'INR',
          name: 'Testing ',
          description: 'Sample Payment',
          handler: function (response) {
            console.log('Payment successful! Payment ID:', response.razorpay_payment_id);
            handleBuyNow(productData, response.razorpay_payment_id);
          },
          prefill: {
            email: user.email,
            contact: formData.mobileNumber,
            name: formData.fullName,
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error('Error during Payment:', error);
      }
    } else {
      navigate('/login');
    }
  };

  return (
    <Container maxWidth="sm">
      <h1>Checkout</h1>
      <form>
        <TextField
          label="Full Name"
          fullWidth
          value={formData.fullName}
          onChange={(e) => handleFieldChange("fullName", e.target.value)}
          margin="normal"
        />
        <TextField
          label="Mobile Number"
          fullWidth
          value={formData.mobileNumber}
          onChange={(e) => handleFieldChange("mobileNumber", e.target.value)}
          margin="normal"
        />
        <TextField
          label="Address"
          fullWidth
          multiline
          rows={4}
          value={formData.Fulladdress}
          onChange={(e) => handleFieldChange("Fulladdress", e.target.value)}
          margin="normal"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handlePayment}
          style={{ marginTop: "1rem" }}
          disabled={!formData.fullName || !formData.mobileNumber || !formData.Fulladdress}
        >
          Next
        </Button>
      </form>
    </Container>
  );
}

export default CheckoutPage;
