import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
import { loginAsync, fetchUserData } from "../features/auth/authSlice";
import { Container, Box, Typography, TextField, Button, Card, CardContent,  } from '@mui/material';
import { useNavigate  } from "react-router-dom"; // If you are using react-router-dom for navigation

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();             
  const {  status, error } = useSelector((state) => state.auth);
  const [UserId, setUserId] = useState("");
  const [PasswordHash, setPasswordHash] = useState("");


  // Handles login click event
  const handleLogin =async  (e) => {
    e.preventDefault();
    const loginRes = await dispatch(loginAsync({ UserId, PasswordHash }));
    if (loginAsync.fulfilled.match(loginRes)) {
      dispatch(fetchUserData());
    }
  }

  useEffect(() => {
    if (status === 'succeeded') {
      navigate('/home');
    }
  }, [status, navigate]);

  return (
    <Container 
      component="main" 
      maxWidth="xs" 
      sx={{
        mt: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: 2,
      }}
    >
      <Card
        sx={{
          width: '100%',
          borderRadius: 4,
          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
          padding: 2,
        }}
      >
        <CardContent>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              component="img"
              src="https://academiq-assets.s3.eu-north-1.amazonaws.com/Academiq-title.png"
              alt="AcademIQ Logo"
              sx={{
                width: { xs: '8rem', sm: '10rem' },
                height: 'auto',
                mb: 2,
              }}
            />
            <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
              Welcome to Academ<span style={{ color: '#4169E1' }}>IQ</span>
            </Typography>
            <Typography variant="subtitle1">
              Please enter your ID and password to log in
            </Typography>
          </Box>

          {/* Display error if login fails */}
          {status === 'failed' && (
            <Typography color="error" variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
              {error}
            </Typography>
          )}

          {/* Email Input */}
          <TextField
            fullWidth
            label="ID"
            variant="outlined"
            type="number"
            value={UserId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter your ID"
            required
            sx={{ mb: 3 }}
          />

          {/* Password Input */}
          <TextField
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
            value={PasswordHash}
            onChange={(e) => setPasswordHash(e.target.value)}
            placeholder="Enter your password"
            required
            sx={{ mb: 3 }}
          />

          {/* Show loading spinner if the login is in progress */}
          {status === 'loading' ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                onClick={handleLogin}
                sx={{
                  bgcolor: '#4169E1',
                  color: '#ffffff',
                  fontWeight: 'bold',
                  mb: 2,
                  '&:hover': {
                    bgcolor: '#365abd',
                  },
                }}
              >
                Log In
              </Button>
              <Button
                variant="text"
                size="small"
                onClick={() => navigate("/forgot-password")}
                sx={{ color: '#757575' }}
              >
                Forgot Password?
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
