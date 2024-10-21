import React, { useEffect, useState } from "react";
import {
    Alert,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import LockIcon from "@mui/icons-material/Lock";
import FilledInput from "@mui/material/FilledInput";
import { useNavigate, useSearchParams } from "react-router-dom";
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

const PasswordReset = () => {
    const [showPassword, setShowPassword] = useState(false);

    const [password, setPassword] = useState("");
    const [subPassword, setSubPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");

    const [resetToken, setResetToken] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate();


    const handleClickShowPassword = () => {
        setShowPassword((show) => !show);
    };

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            setResetToken(token);
        }
    }, [searchParams]);

    const handleSubmit = async () => {
        console.log(resetToken);

        if (password == undefined || password == "" || password.length < 8) {
            setErrorMessage("הסיסמה חייבת להיות לפחות 8 תווים");
            return;
        }

        if (password == subPassword) {

            try {
                const response = await fetch('http://misha-rn-test.somee.com/api/Password/reset', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        resetToken: resetToken,
                        newPassword: password
                    }),
                    cache: 'no-cache',
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log(data);

                    navigate("/login");

                } else {
                    const errorData = await response.json();
                    console.log('Error:', errorData);
                    setErrorMessage(errorData)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                setErrorMessage(error)
            }

        } else {
            setErrorMessage("הסיסמות אינן תואמות");
        }
    };


    return (
        <Container component={'main'} sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
                    חידוש ססמה
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    הזן את הססמא החדשה
                </Typography>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Password"
                    variant="outlined"
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                    value={password}
                />
                <TextField
                    fullWidth
                    margin="normal"
                    label="Confirm Password"
                    variant="outlined"
                    type="password"
                    onChange={(event) => setSubPassword(event.target.value)}
                    value={subPassword}
                />
                {errorMessage && (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {errorMessage}
                    </Typography>
                )}
                <Box mt={2}>
                    <Button variant="contained" size='large' onClick={handleSubmit}>
                        Done
                    </Button>
                    <Button variant="text" size='large' onClick={() => navigate("/login")} >
                        Log In
                    </Button>
                </Box>
            </StyledBox>
        </Container>
    );
};

export default PasswordReset;
