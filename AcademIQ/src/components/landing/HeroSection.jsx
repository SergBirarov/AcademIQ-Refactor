import { Typography, Box, Grid2 } from '@mui/material';
import { GetVw } from '../../utils/GeneralHelpers';
import LandingButton from '../common/buttons/LandingButton';


export default function HeroSection() {
  return (

    <>
      <Grid2 container spacing={3} alignItems="center">
        <Grid2 item xs={12} md={6}>
          <Box
            component="img"
            src="https://academiq-assets.s3.eu-north-1.amazonaws.com/academiq-logo.png"
            alt="logo"
            sx={{ width: { xs: GetVw(400), md: GetVw(500) } }}
          />
        </Grid2>

        <Grid2 item xs={12} md={6}>
          <Box>
            <Typography variant="h1" component="h1" gutterBottom>
              Welcome to Academ<span style={{ color: '#4169E1' }}>IQ</span>
            </Typography>
            <Typography variant="h3" component="h3">
              Revolutionize your academic experience
            </Typography>
          </Box>
          <Box sx={{ mt: 4 }}>
            <LandingButton text="Get Started" />
            <LandingButton text="Learn More" />
          </Box>
        </Grid2>
      </Grid2>
    </>

  );
}