import React from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginAsync } from '../../Redux/slices/authSlice';
import { AppDispatch } from '../../Redux/store/store';
interface LoginFormValues {
  id: number;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  // Formik setup for the login form
  const formik = useFormik<LoginFormValues>({
    initialValues: {
      id: 0,
      password: '',
    },
    validationSchema: Yup.object({
      id: Yup.number()
        .typeError('Invalid ID number. Please enter a valid ID number.')
        .required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),
    onSubmit: async (values) => {
      try {
        const resultAction = await dispatch(loginAsync({ UserId: values.id, PasswordHash: values.password }));
        if (loginAsync.fulfilled.match(resultAction)) {
          const { user } = resultAction.payload as any;
  
          if (user.Role !== 'Student') {
            navigate('/home-staff');
          } else {
            navigate('/home');
          }
        } else {
          alert("Login failed. Please check your credentials.");
        }
      } catch (error) {
        console.error("Login error: ", error);
      }
    },
  });

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ boxShadow: 3, p: 4, borderRadius: 2 }}
      >
        <Typography variant="h4" gutterBottom>
          Login to AcademIQ
        </Typography>
        <form onSubmit={formik.handleSubmit} style={{ width: '100%' }}>
          <TextField
            fullWidth
            id="id"
            name="id"
            label="ID Number"
            value={formik.values.id}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.id && Boolean(formik.errors.id)}
            helperText={formik.touched.id && formik.errors.id}
            margin="normal"
          />
          <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            margin="normal"
          />
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            sx={{ mt: 3 }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
