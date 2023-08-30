import React, { useState, useContext } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ContextApi } from "../Routs/ContextApi";
import Config from "../Config";
import { FaGoogle, FaGithub } from "react-icons/fa";

const Login = () => {
  const initialFormData = { identifier: "", password: "" };
  const [form, setForm] = useState(initialFormData);
  const { setIsLogin ,setUser} = useContext(ContextApi);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const response = await axios.get("http://localhost:1337/api/connect/google");
      console.log("Google login success:", response.data);
      setIsLogin(true);
      navigate("/");
    } catch (error) {
      console.error("Google login failure:", error);
    }
  };

  const handleGitHubLogin = async () => {
    try {
      const response = await axios.get("http://localhost:1337/connect/github");
      console.log("GitHub login success:", response.data);
      setIsLogin(true);
      navigate("/");
    } catch (error) {
      console.error("GitHub login failure:", error);
    }
  };

  const handleValue = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = () => {
    console.log("Logged in with:", form.identifier, form.password);
    axios
      .post(Config.apikeylogin, form)
      .then((res) => {
        setUser(res.data.user)
        localStorage.setItem("SessionId",res.data.jwt)
        localStorage.setItem("id",res.data.user.id)
        setIsLogin(res.data.user.id);
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
        {/* Google Login */}
        <Button
          variant="contained"
          fullWidth
          style={{ backgroundColor: "#DB4437", marginTop: "10px" }}
          startIcon={<FaGoogle />}
          onClick={handleGoogleLogin}
        >
          Login with Google
        </Button>

        {/* GitHub Login */}
        <Button
          variant="contained"
          fullWidth
          style={{ backgroundColor: "#333", marginTop: "10px" }}
          startIcon={<FaGithub />}
          onClick={handleGitHubLogin}
        >
          Login with GitHub
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
