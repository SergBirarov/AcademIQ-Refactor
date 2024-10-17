import Layout from '../layouts/GeneralContainer'
import styled from '@emotion/styled'
import { WidthFull } from '@mui/icons-material';
import { Box, Container, Typography, TextField, Button } from '@mui/material';
import { GetVw, GetVh } from '../utils/GeneralHelpers';
import { useUser } from '../context/UserContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import FilledInput from "@mui/material/FilledInput";


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

const Login = ({ onForgotPassword }) => {
    const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { setUser } = useUser();

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = async () => {

    try {
      const response = await fetch('http://misha-rn-test.somee.com/api/User/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          id: userId,
          email: "",
          password: password,
        }),
        cache: 'no-cache',
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const userData = data.userData || data.user;
        localStorage.setItem('token', data.token); 
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        window.location.href = "/home";

      } else {
        const errorData = await response.json();
        console.log('Error:', errorData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

    return(
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
        Login
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Please enter your ID and password to log in
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="ID"
        variant="outlined"
        onChange={(event) => setUserId(event.target.value)}
      />
      <TextField
        fullWidth
        margin="normal"
        label="Password"
        variant="outlined"
        type="password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <Box mt={2}>
        <Button variant="contained" size='large' onClick={handleSubmit}>
          Log In
        </Button>
        <Button variant="text" size='large' >
          Forgot Password?
        </Button>
      </Box>
    </StyledBox>
    )
}
export default function LoginPage() {
    
    
    return (
        <Container component={'main'} sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Login/>
            </Container>
    )
}