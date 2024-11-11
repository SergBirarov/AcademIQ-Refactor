import 'aos/dist/aos.css';
import {  Box, Typography, Container } from '@mui/material';

export default function LandingBody() {


    return (
        <Container component="main" sx={{ padding: { xs: 2, md: 4 }, textAlign: 'center' }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: { xs: 'column', md: 'row' },
            padding: { xs: 2, md: 4 },
            gap: { xs: 4, md: 8 },
            height: '100%',
            width: '100%',
          }}>
          <Box
          component="img"
          src="https://academiq-assets.s3.eu-north-1.amazonaws.com/landing1.png"
          alt="Manage Courses"
          sx={{ maxWidth: { xs: '40%', md: '20%' }, mb: { xs: 4, md: 0 }, borderRadius: '16px' }}
        />
        <Typography variant="h2" sx={{ maxWidth: { xs: '100%', md: '50%' } }}>
          Manage Your Courses Effectively
        </Typography>
          </Box>

          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: { xs: 'column', md: 'row' },
            padding: { xs: 2, md: 4 },
            gap: { xs: 4, md: 8 },
            height: '100%',
            width: '100%',
          }}>
<Typography variant="h2" sx={{ maxWidth: { xs: '100%', md: '50%' } }}>
          Collaborate and Learn Seamlessly
        </Typography>
        <Box
          component="img"
          src="https://academiq-assets.s3.eu-north-1.amazonaws.com/landing2.png"
          alt="Collaborate"
          sx={{ maxWidth: { xs: '40%', md: '20%' }, mb: { xs: 4, md: 0 }, borderRadius: '16px' }}
        />
          </Box>


          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: { xs: 'column', md: 'row' },
            padding: { xs: 2, md: 4 },
            gap: { xs: 4, md: 8 },
            height: '100%',
            width: '100%',
          }}>
           <Box
          component="img"
          src="https://academiq-assets.s3.eu-north-1.amazonaws.com/landing3.png"
          alt="Join Community"
          sx={{ maxWidth: { xs: '40%', md: '20%' }, mb: { xs: 4, md: 0 }, borderRadius: '16px' }}
        />
        <Typography variant="h2" sx={{ maxWidth: { xs: '100%', md: '50%' } }}>
          Join Our Community
        </Typography>
          </Box>
    </Container>
    )
}