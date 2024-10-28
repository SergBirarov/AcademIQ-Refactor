import {  Container, Grid2, Box } from '@mui/material'
import { SectionTitle, SubSectionTitle } from '../components/common/SectionTitle';
import { useUser } from '../context/UserContext';
import BubbleMenu from '../components/common/home/BubbleMenu';
// import NoticeBoard from '../components/common/home/NoticeBoard';
import QuickActionsCourses from '../components/common/home/QuickActionsCourses';
import theme from '../theme';
import styled from '@emotion/styled';

const MainContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    maxHeight:'90vh',
    width: '100%',
    minHeight: '90vh',
  }));



export default function Home() {
    const { user } = useUser();


    return (
        <>
        <MainContainer>
          <Box component={'header'} sx={{height: '10vh', width: '100%'}}> 
          <SectionTitle title="Welcome to your Dashboard!" />
          </Box>
          <Box component={'section'} sx={{
            display: 'flex',
            width: '20vw',
            maxWidth: '310vw',
            minWidth: '100%',
            height: '30vh',
            flexDirection: 'column',
            flexWrap: 'wrap',
            backdropFilter: 'blur(10px)',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            borderRadius: '16px',

          }}>
            <BubbleMenu />
          </Box>

          <Box component={'section'} >
            <QuickActionsCourses/>
          </Box>
        </MainContainer>
        {/* <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent:'space-between',
            height: '100%',
            padding: theme.spacing(3),
            gap: '50px', // Adds spacing between elements
            width: '100%',
          }}
        >
          <Box component="header" sx={{ width: '100%', textAlign: 'center' }}>
            <SectionTitle title="Welcome to your Dashboard!" />
          </Box>
  
          <Box
            component="section"
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flexWrap: 'wrap',
              flexDirection: 'row',
              backdropFilter: 'blur(5px)',
              height: '210px',
              padding: theme.spacing(3),
              width: '500px',

            }}
          >
            <BubbleMenu />
          </Box>
  
          <Box
            component="section"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <QuickActionsCourses />
          </Box>
        </Box> */}
      </>
        // <>
        // <Grid2 container spacing={3}>
        //     <Grid2 item xs={12} md={6}>
        //         <Box component={'header'}> 
        //         <SectionTitle title={`Welcome ${user?.firstName}!`}/>
        //         </Box>
        //     </Grid2>
        //     <Grid2 item xs={12} md={6}>
        //         <Box component={'section'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px'}}>
        //         <BubbleMenu />
        //         </Box>
        //     </Grid2>
        //     <Grid2 item xs={12} md={6}>
        //         <Box component={'section'}>
        //         <NoticeBoard />
        //         </Box>
        //     </Grid2>
        // </Grid2>
        // </>

    )
}