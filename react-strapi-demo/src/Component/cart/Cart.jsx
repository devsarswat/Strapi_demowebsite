import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { ContextApi } from "../Routs/ContextApi";

const Cart = () => {
  const { Token } = useContext(ContextApi);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [TotalProduct, setTotalProductCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/carts?populate=*", {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [Token]);
  const User_id = parseInt(localStorage.getItem("id"), 10);
  useEffect(() => {
    const filtered = products.filter(
      (product) => product.attributes.Userid === User_id
    );
    setFilteredProducts(filtered);
  }, [products, User_id]);
  useEffect(() => {
    const calculatedTotalPrice = filteredProducts.reduce((total, product) => {
      if (product.attributes.price) {
        return total + product.attributes.price * product.attributes.quantity;
      }
      return total;
    }, 0);

    setTotalPrice(calculatedTotalPrice);
    const totalProductCount = filteredProducts.reduce((total, product) => {
      return total + product.attributes.quantity;
    }, 0);

    setTotalProductCount(totalProductCount);
  }, [filteredProducts]);
  const handleremove = (productId) => {
    const productToRemove = filteredProducts.find(
      (product) => product.id === productId
    );

    if (productToRemove) {
      if (productToRemove.attributes.quantity > 1) {
        axios
          .put(
            `http://localhost:1337/api/carts/${productId}`,
            { data: { quantity: productToRemove.attributes.quantity - 1 } },
            {
              headers: {
                Authorization: `Bearer ${Token}`,
              },
            }
          )
          .then(() => {
            console.log("Product quantity decreased successfully");
            setFilteredProducts((prevProducts) =>
              prevProducts.map((product) =>
                product.id === productId
                  ? {
                      ...product,
                      attributes: {
                        ...product.attributes,
                        quantity: product.attributes.quantity - 1,
                      },
                    }
                  : product
              )
            );
          })
          .catch((error) => {
            console.error("Error decreasing product quantity:", error);
          });
      } else {
        axios
          .delete(`http://localhost:1337/api/carts/${productId}`, {
            headers: {
              Authorization: `Bearer ${Token}`,
            },
          })
          .then(() => {
            console.log("Product Removed successfully");
            setFilteredProducts((prevProducts) =>
              prevProducts.filter((product) => product.id !== productId)
            );
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      {filteredProducts.map((product) => (
        <Card key={product.id} sx={{ width: 345 }}>
          {product.attributes.image_url &&
            product.attributes.image_url.data && (
              <CardMedia
                component="img"
                alt={product.attributes.name}
                height="140"
                image={`${"http://localhost:1337"}${
                  product.attributes.image_url.data.attributes.url
                }`}
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
            <Typography variant="body2" color="text.secondary">
              Quantity: {product.attributes.quantity}
            </Typography>
            <Button
              variant="contained"
              color="error"
              className="mx-2 my-2"
              onClick={() => handleremove(product.id)}
            >
              Remove from Cart
            </Button>
          </CardContent>
        </Card>
      ))}
      <div style={{ marginTop: "20px" }}>
        <Typography variant="h6">Cart Summary</Typography>
        <Typography>Items Count: {filteredProducts.length}</Typography>
        <Typography>Total Items: {TotalProduct}</Typography>
        <Typography>Total Price: ₹ {totalPrice}</Typography>
        <Button variant="contained" color="success" className="mx-2 my-2">
          Place Order
        </Button>
      </div>
    </div>
  );
};

export default Cart;
