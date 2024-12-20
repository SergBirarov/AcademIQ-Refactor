import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { SectionTitle } from "../components/common/SectionTitle";
import { Container, Box, Typography, Tabs, Tab, Avatar, FormControl, Grid2, Paper, Button, TextField, Divider } from "@mui/material";
import styled from '@emotion/styled';
import { useState } from "react";
import Lottie  from "lottie-react";

import animation from '../assets/json-animations/Person.json';




export default function Profile() {
    const {user} = useSelector((state) => state.auth);
    const [tab, setTab] = useState(0);

    const StyledContainer = styled(Container)(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 0,
        minWidth: '60%',
        maxWidth: '60%',
        height: '100%',
        // backgroundColor: theme.palette.background.default,
        // boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        // padding: theme.spacing(3),
        borderRadius: '8px',
    }));

    const InfoCard = styled(Paper)(({ theme }) => ({
        padding: theme.spacing(4),
        marginBottom: theme.spacing(2),
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        borderRadius: '16px',
    }));

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };
    return (
        <Container component={'section'} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: '100%', height: '100%', minWidth: '100%'}}>
            <StyledContainer>
                <Tabs value={tab} onChange={handleTabChange}>
                    <Tab label="Your Contact Info" />
                    <Tab label="Tuition Control" />
                    <Tab label="Update Us" />
                </Tabs>
                <Box component={'div'} sx={{ textAlign: 'center', padding: 2, mt: 2 }}>
                                <Avatar src={user?.Picture_URL} sx={{ width: 120, height: 120, margin: 'auto', mb: 2, border: '2px solid black' }} />
                                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{user?.FirstName} {user?.LastName}</Typography>
                            </Box>

                <Box sx={{ paddingTop: 2 }}>
                    {tab === 0 && (
                        
                        <>
                       

                            <Grid2 container spacing={2}>

                                <Grid2 item xs={12} sm={6}>
                                    <Box component={'div'}>
                                        
                                        <InfoCard sx={{ padding: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            
                                         }}>
                                            <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2 }}>Contact Information</Typography>
                                            <Typography variant="body1"><strong>Email:</strong> {user?.Email}</Typography>
                                            <Typography variant="body1"><strong>Phone:</strong> {user?.Phone}</Typography>
                                            <Typography variant="body1"><strong>Address:</strong> {user?.Address}</Typography>
                                        </InfoCard>
                                    </Box>
                                    </Grid2>
                                {/* <Grid2 item xs={12} sm={6}>

                                    <InfoCard>
                                        <Typography variant="body1"><strong>Email:</strong> {user?.email}</Typography>
                                    </InfoCard>
                                </Grid2>
                                <Grid2 item xs={12} sm={6}>
                                    <InfoCard>
                                        <Typography variant="body1"><strong>Phone:</strong> {user?.phone}</Typography>
                                    </InfoCard>
                                </Grid2>
                                <Grid2 item xs={12}>
                                    <InfoCard>
                                        <Typography variant="body1"><strong>Address:</strong> {user?.address}</Typography>
                                    </InfoCard>
                                </Grid2> */}
                            </Grid2> 
                        </>
                        
                    )}
                    {tab === 1 && (
                        <>
                        <InfoCard>
                        <Typography variant="h6">Tuition Overview</Typography>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="body1">Paid: $5000</Typography>
                        <Typography variant="body1">Outstanding: $2000</Typography>
                        <Button variant="contained" color="primary" sx={{ mt: 2 }}>View Payment History</Button>
                    </InfoCard>
                    
                    </>
                    )}
                    {tab === 2 && (

                        <InfoCard>
                        <Typography variant="h6">Update Information</Typography>
                        <Divider sx={{ my: 2 }} />
                        <TextField fullWidth label="Update Phone" sx={{ mb: 2 }} />
                        <TextField fullWidth label="Update Address" sx={{ mb: 2 }} />
                        <Button variant="contained" color="primary">Save Changes</Button>
                    </InfoCard>
                    )}
                </Box>
            </StyledContainer>
            <Container component={'section'} maxWidth='300' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 0 }}>
                <Lottie animationData={animation} loop={true} style ={{ height: 300, width: 300 }} />
                <Typography variant="h5" component="h5" sx={{ mt: 3 }} align="center">Welcome to your profile!</Typography>
                <Typography variant="body1" component="p" sx={{ mt: 3 }} align="center">Here you can see your contact info<br></br> and update us on any changes!</Typography>
            </Container>
            </Container>
    )
}