import React, { useState, useContext } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ContextApi } from "../Routs/ContextApi";
import Config from "../Config";
const Login = () => {
  const initialFormData = { identifier: "", password: "" };
  const [form, setForm] = useState(initialFormData);
  const { setIsLogin } = useContext(ContextApi);
  const navigate = useNavigate();

  const handleValue = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = () => {
    console.log("Logged in with:", form.identifier, form.password);
    axios
      .post(Config.apikeylogin, form)
      .then(() => {
        console.log("login success");
        setIsLogin(true);
        navigate("/");
      })
      .catch((error) => console.error(error));
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <form>
        <TextField
          name="identifier"
          label="Email"
          fullWidth
          margin="normal"
          variant="outlined"
          value={form.identifier}
          onChange={handleValue}
        />
        <TextField
          name="password"
          label="Password"
          fullWidth
          type="password"
          margin="normal"
          variant="outlined"
          value={form.password}
          onChange={handleValue}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
        <Typography variant="body1" className="register-link">
          Don't have an account?{" "}
          <Link to="/signin" color="inherit">
            Register
          </Link>
        </Typography>
      </form>
    </Container>
  );
};

export default Login;
