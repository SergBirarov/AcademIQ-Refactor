import { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css';
import { Grid2, Box, Typography, Paper, Container } from '@mui/material';

const Section = ({children, animation}) => {
    return(
    <Box component={'section'}
        sx={{ display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            padding:4,
         }}
         data-aos={animation}
        >

        {children}

    </Box>
    )
}

// const LottieAnimation = ({animation}) => {
//     return (
//         <Box sx={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             height: '100%',
//             width: '100%',
//             backgroundColor: 'inherit',
//         }}>
//             <Lottie
//                 animationData={animation}
//                 loop={true}
//                 style={{
//                     height: `${GetVh(100)}`,
//                     width:`${GetVw(100)}`,
//                 }}/>
//         </Box>
//     )
// };

export default function LandingBody() {

    useEffect(() => {
        Aos.init({ duration: 1000 });
    }, []);

    return (
        <Container component="main" sx={{ padding: { xs: 2, md: 4 }, textAlign: 'center' }}>
      {/* Section 1 */}
      <Section data-aos="fade-up">
        <Box
          component="img"
          src="https://academiq-assets.s3.eu-north-1.amazonaws.com/landing1.png"
          alt="Manage Courses"
          sx={{ maxWidth: { xs: '40%', md: '20%' }, mb: { xs: 4, md: 0 }, borderRadius: '16px' }}
        />
        <Typography variant="h4" sx={{ maxWidth: { xs: '100%', md: '50%' } }}>
          Manage Your Courses Effectively
        </Typography>
      </Section>

      {/* Section 2 */}
      <Section data-aos="fade-up">
        <Typography variant="h4" sx={{ maxWidth: { xs: '100%', md: '50%' } }}>
          Collaborate and Learn Seamlessly
        </Typography>
        <Box
          component="img"
          src="https://academiq-assets.s3.eu-north-1.amazonaws.com/landing2.png"
          alt="Collaborate"
          sx={{ maxWidth: { xs: '100%', md: '20%' }, mb: { xs: 4, md: 0 } }}
        />
      </Section>

      {/* Section 3 */}
      <Section data-aos="fade-up">
        <Box
          component="img"
          src="https://academiq-assets.s3.eu-north-1.amazonaws.com/landing3.png"
          alt="Join Community"
          sx={{ maxWidth: { xs: '100%', md: '20%' }, mb: { xs: 4, md: 0 } }}
        />
        <Typography variant="h4" sx={{ maxWidth: { xs: '100%', md: '50%' } }}>
          Join Our Community
        </Typography>
      </Section>
    </Container>
    )
}