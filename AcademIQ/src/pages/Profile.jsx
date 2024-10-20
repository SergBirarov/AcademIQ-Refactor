import { useUser } from "../context/UserContext";
import { SectionTitle } from "../components/common/SectionTitle";
import { Container, Box, Typography, Tabs, Tab } from "@mui/material";
import styled from '@emotion/styled';
import { useState } from "react";




export default function Profile() {
    const {user} = useUser();
    const [tab, setTab] = useState(0);

    const StyledContainer = styled(Container)(({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        minWidth: '100%',
        height: '100%',
        backgroundColor: theme.palette.background.default,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        padding: theme.spacing(3),
        borderRadius: '16px',
    }));

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };
    return (
        <>
            <StyledContainer>
                <Tabs value={tab} onChange={handleTabChange}>
                    <Tab label="Your Contact Info" />
                    <Tab label="Tuition Control" />
                    <Tab label="Update Us" />
                </Tabs>

                <Box sx={{ paddingTop: 2 }}>
                    {tab === 0 && (
                        
                        <Box component={'div'}>
                            
                        </Box>
                    )}
                    {tab === 1 && (
                        <Typography variant="body1">Tuition Control Section</Typography>
                    )}
                    {tab === 2 && (
                        <Typography variant="body1">Update Us Section</Typography>
                    )}
                </Box>
            </StyledContainer>
            </>
    )
}