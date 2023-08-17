import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Config from '../Config';

const Registration = () => {
  const data = { Fname: '', Lname: '',username:'', email: '', password: '', conformPassword: '' };
  const [Form, setForm] = useState(data);
  const nevigat=useNavigate()
  const handleValue = (e) => {
    const { name, value } = e.target;
    setForm((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegistration = () => {
    console.log("Registered with:", Form.Fname, Form.Lname, Form.email, Form.password, Form.conformPassword);
    axios.post(Config.apikeyregistration,Form)
    .then(()=>{
        console.log("Registration success")
        nevigat('/login')
    }).catch((error)=>console.error(error))
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        Registration
      </Typography>
      <form>
        <TextField
          name="Fname"
          label="First Name"
          fullWidth
          margin="normal"
          variant="outlined"
          value={Form.Fname}
          onChange={handleValue}
        />
        <TextField
          name="Lname"
          label="Last Name"
          fullWidth
          margin="normal"
          variant="outlined"
          value={Form.Lname}
          onChange={handleValue}
        />
         <TextField
          name="username"
          label="User Name"
          fullWidth
          margin="normal"
          variant="outlined"
          value={Form.username}
          onChange={handleValue}
        />
        <TextField
          name="email"
          label="Email"
          fullWidth
          margin="normal"
          variant="outlined"
          value={Form.email}
          onChange={handleValue}
        />
        <TextField
          name="password"
          label="Password"
          fullWidth
          type="password"
          margin="normal"
          variant="outlined"
          value={Form.password}
          onChange={handleValue}
        />
        <TextField
          name="conformPassword"
          label="Confirm Password"
          fullWidth
          type="password"
          margin="normal"
          variant="outlined"
          value={Form.conformPassword}
          onChange={handleValue}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRegistration}
        >
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Registration;
