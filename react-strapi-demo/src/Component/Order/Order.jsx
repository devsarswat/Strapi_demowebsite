import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ContextApi } from "../Routs/ContextApi";
import CardMedia from "@mui/material/CardMedia";

const Order = () => {
  const { Token, user } = useContext(ContextApi);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/orders?populate=*", {
        headers: {
          Authorization: `Bearer ${Token}`,
        },
      })
      .then((response) => {
        setOrders(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, [Token]);

  const filteredOrders = orders.filter(
    (order) => order.attributes.name === user.username
  );
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "20px",
      }}
    >
      {filteredOrders.map((order) => (
        <Card key={order.id} sx={{ width: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Order ID: {order.attributes.orderid}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Order Date:{" "}
              {new Date(order.attributes.createdAt).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Order Status: {order.attributes.status}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Total Amount: ₹{order.attributes.amount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Products:
            </Typography>
            <div>
              {order.attributes.products.map((product, index) => (
                <Card key={index} sx={{ marginTop: "10px", padding: "10px" }}>
                  {product.productImage && (
                    <CardMedia
                      component="img"
                      height={100}
                      image={`http://localhost:1337${product.productImage}`}
                      alt={product.productName}
                    />
                  )}
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Product: {product.productName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Price: ₹{product.price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {product.quantity}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Order;
