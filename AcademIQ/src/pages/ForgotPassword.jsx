import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography, Container
} from "@mui/material";

import styled from '@emotion/styled'



const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 1,
  alignItems: 'center',
  width: '50%',
  minHeight: '90vh',
  justifyContent: 'center',
  padding: theme.spacing(3),
  borderRadius: '16px',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.down('md')]: {
    width: '90%',
  },
}))

const ForgotPasswordFun = () => {

  const [email, setEmail] = useState("")
  const [id, setId] = useState("")
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


  const handleSubmit = async (e) => {
    console.log("Email sent to", email, id)

    setErrorMessage("");
    if (email.trim() === "" || id.trim() === "") {
      setErrorMessage("ID and password are required.");
      return;
    }

    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email address.");
      return;
    }

    try {
      const response = await fetch('http://misha-rn-test.somee.com/api/Password/reset-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          id: id,
        }),
        cache: 'no-cache',
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate("/")

      } else {
        const errorData = await response.json();
        console.log('Error:', errorData);
        setErrorMessage("ID and password are required.");
        console.log(errorData);

      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrorMessage("An error occurred. Please try again.");
      console.log(error);
    }
  };





  return (
    <StyledBox>
      <Box
        component="img"
        src="https://academiq-assets.s3.eu-north-1.amazonaws.com/Academiq-title.png"
        sx={{
          width: { xs: "10rem", sm: "12rem" },
          height: "auto",
          marginRight: "auto",
        }}
      />
      <Typography variant="h3" gutterBottom>
        שחזור סיסמא
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        הזן את מספר הזהות וכתובת המייל כדי לקבל קוד לשחזור הססמא
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="ID"
        variant="outlined"
        onChange={(event) => {
          const value = event.target.value;
          const numericValue = value.replace(/\D/g, '');
          setId(numericValue);
        }}
        value={id}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        variant="outlined"
        type="Email"
        onChange={(event) => {
          const value = event.target.value;
          const englishOnlyValue = value.replace(/[^0-9a-zA-Z@._-]/g, '');
          setEmail(englishOnlyValue);
        }}
        value={email}
      />
      {errorMessage && (
        <Typography color="error" sx={{ mt: 2 }}>
          {errorMessage}
        </Typography>
      )}
      <Box mt={2}>
        <Button variant="contained" size='large' onClick={handleSubmit}>
          Sent Link
        </Button>
        <Button variant="text" size='large' onClick={() => navigate("/login")} >
          Log In
        </Button>
      </Box>
    </StyledBox>
  )
}
export default function ForgotPassword() {
  return (
    <Container component={'main'} sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <ForgotPasswordFun />
    </Container>
  )
}