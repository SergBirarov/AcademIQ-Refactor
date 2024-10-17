import LandingContainer from '../layouts/GeneralContainer';
import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import {  Box , Container} from '@mui/material';
import HeroSection from '../components/landing/HeroSection';
import styled from '@emotion/styled';
import LandingBody from '../components/landing/LandingBody';

export default function Landing() {


    return (

        <LandingContainer component="main">
        <HeroSection />
        <LandingBody />
    </LandingContainer>

    )

}