import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // Ensure this path matches where you store your AuthContext
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from "react-router-dom"; // If you are using react-router-dom for navigation

export default function LoginPage() {
  const {  user, login, register, authToken, logout  } = useContext(AuthContext);  // Get the login function from context
  const [UserId, setUserId] = useState(null);
  const [PasswordHash, setPasswordHash] = useState(null);
  const [error, setError] = useState(null);   // Optional: Handle errors
  const navigate = useNavigate();             // Use react-router for navigation

  // Handles login click event
  const handleLogin = async () => {
    try {
      await login(UserId, PasswordHash);  // Call the login function from context
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
        label="Id"
        variant="outlined"
        type="number"
        value={UserId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="Id"
        required
        sx={{ mb: 2 }}  // Added some spacing below the field
      />

      {/* Password Input */}
      <TextField
        fullWidth
        label="Password"
        variant="outlined"
        type="password"
        value={PasswordHash}
        onChange={(e) => setPasswordHash(e.target.value)}
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
