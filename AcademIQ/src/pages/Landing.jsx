import 'aos/dist/aos.css';
import HeroSection from '../components/landing/HeroSection';
import LandingBody from '../components/landing/LandingBody';
import { Container } from '@mui/material';
import theme from '../theme';
import styled from '@emotion/styled';


const LandingContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '90vh',
    marginTop: '5vh',
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: theme.palette.background.paper,
}))
export default function Landing() {


    return (

        <LandingContainer component="main">
        <HeroSection />
        <LandingBody />
    </LandingContainer>

    )

}