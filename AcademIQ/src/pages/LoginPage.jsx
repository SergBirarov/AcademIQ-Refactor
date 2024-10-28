// import styled from '@emotion/styled'
// import { Box, Container, Typography, TextField, Button } from '@mui/material';
// import { useEffect, useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';


// const StyledBox = styled(Box)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   flexShrink: 1,
//   alignItems: 'center',
//   width: '50%',
//   minHeight: '90vh',
//   justifyContent: 'center',
//   padding: theme.spacing(3),
//   borderRadius: '16px',
//   boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
//   backgroundColor: theme.palette.background.paper,
//   [theme.breakpoints.down('md')]: {
//     width: '90%',
//   },
// }))

// // const Login = () => {
// //   // const [showPassword, setShowPassword] = useState(false);
// //   const { login } = useContext(AuthContext);
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");

// //   const navigate = useNavigate()

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     console.log(email, password);
// //     try {
// //       await login(email, password);
// //       navigate("/home");
// //     } catch (error) {
// //       console.error("Login failed", error);
// //     }
// //   };

//   // const handleClickShowPassword = () => setShowPassword((show) => !show);


//   //   try {
//   //     const response = await fetch('AcademIQ_database_V2.mssql.somee.com/api/authentication/login', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Content-Type': 'application/json',
//   //         'Accept': 'application/json',
//   //       },
//   //       body: JSON.stringify({
//   //         id: userId,
//   //         email: "",
//   //         password: password,
//   //       }),
//   //       cache: 'no-cache',
//   //     });

//   //     if (response.ok) {
//   //       const data = await response.json();
//   //       console.log(data);
//   //       const userData = data.userData || data.user;

//   //       localStorage.setItem('token', data.token);
//   //       localStorage.setItem('user', JSON.stringify(userData));
//   //       setUser(userData);
//   //       // window.location.href = "/home";
//   //       navigate("/home")

//   //     } else {
//   //       const errorData = await response.json();
//   //       console.log('Error:', errorData);
//   //       setErrorMessage("Invalid ID or password. Please try again.");
//   //     }
//   //   } catch (error) {
//   //     console.error('Error fetching data:', error);
//   //     setErrorMessage("An error occurred. Please try again.");
//   //   }
//   // };

//   return (
//     <StyledBox>
//       <Box
//         component="img"
//         src="https://academiq-assets.s3.eu-north-1.amazonaws.com/Academiq-title.png"
//         sx={{
//           width: { xs: "10rem", sm: "12rem" },
//           height: "auto",
//           marginRight: "auto",
//         }}
//       />
//       <Typography variant="h3" gutterBottom>
//         Login
//       </Typography>
//       <Typography variant="subtitle1" gutterBottom>
//         Please enter your Email and password to log in
//       </Typography>
//       <TextField
//         fullWidth
//         label="ID"
//         variant="outlined"
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         required
//       />
//       <TextField
//        type="password"
//        value={password}
//        onChange={(e) => setPassword(e.target.value)}
//        placeholder="Password"
//        required
//       />
      
//       <Box mt={2}>
//         <Button variant="contained" size='large' onClick={handleLogin}>
//           Log In
//         </Button>
//         <Button variant="text" size='large' onClick={() => navigate("/forgot-password")} >
//           Forgot Password?
//         </Button>
//       </Box>
//     </StyledBox>
//   )
// }
// export default function LoginPage() {
//   const { user } = useContext(AuthContext);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const login = async (email, password) => {
//     try {
//         const response = await fetch('https://localhost:5092/api/Authentication/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ email, password }),
//         });

//         if (!response.ok) {
//             throw new Error('Login failed');
//         }

//         const data = await response.json();
//         setAuthToken(data.token);
//         localStorage.setItem('authToken', data.token);

//     } catch (error) {
//         console.error("Login error", error);
//         throw error;
//     }
// };

//   return (
//     <Container component={'main'} sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//      <StyledBox>
//       <Box
//         component="img"
//         src="https://academiq-assets.s3.eu-north-1.amazonaws.com/Academiq-title.png"
//         sx={{
//           width: { xs: "10rem", sm: "12rem" },
//           height: "auto",
//           marginRight: "auto",
//         }}
//       />
//       <Typography variant="h3" gutterBottom>
//         Login
//       </Typography>
//       <Typography variant="subtitle1" gutterBottom>
//         Please enter your Email and password to log in
//       </Typography>
//       <TextField
//         fullWidth
//         label="ID"
//         variant="outlined"
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         required
//       />
//       <TextField
//        type="password"
//        value={password}
//        onChange={(e) => setPassword(e.target.value)}
//        placeholder="Password"
//        required
//       />
      
//       <Box mt={2}>
//         <Button variant="contained" size='large' onClick={handleLogin}>
//           Log In
//         </Button>
//         <Button variant="text" size='large' onClick={() => navigate("/forgot-password")} >
//           Forgot Password?
//         </Button>
//       </Box>
//     </StyledBox>
//     </Container>
//   )
// }


import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Ensure this path matches where you store your AuthContext
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from "react-router-dom"; // If you are using react-router-dom for navigation

export default function LoginPage() {
  const { login } = useContext(AuthContext);  // Get the login function from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);   // Optional: Handle errors
  const navigate = useNavigate();             // Use react-router for navigation

  // Handles login click event
  const handleLogin = async () => {
    try {
      await login(email, password);  // Call the login function from context
      navigate("/home");        // Navigate to the dashboard after successful login
    } catch (error) {
      setError("Login failed. Please check your credentials.");
      console.error("Login error", error);  // Handle login errors
    }
  };

  return (
    <Container component={'main'} sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
        Please enter your Email and password to log in
      </Typography>

      {/* Display error if login fails */}
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      {/* Email Input */}
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        sx={{ mb: 2 }}  // Added some spacing below the field
      />

      {/* Password Input */}
      <TextField
        fullWidth
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        sx={{ mb: 2 }}
      />

      <Box mt={2}>
        <Button variant="contained" size='large' onClick={handleLogin}>
          Log In
        </Button>
        <Button variant="text" size='large' onClick={() => navigate("/forgot-password")}>
          Forgot Password?
        </Button>
      </Box>
    </Container>
  );
}
