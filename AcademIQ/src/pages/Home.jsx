import { Typography, Container, Grid2, Box } from '@mui/material'
import { GetVw, GetVh } from '../utils/GeneralHelpers';
import { SectionTitle, SubSectionTitle } from '../components/common/SectionTitle';
import { useUser } from '../context/UserContext';
import BubbleMenu from '../components/common/home/BubbleMenu';
import NoticeBoard from '../components/common/home/NoticeBoard';




export default function Home() {
    const { user } = useUser();
    console.log("user");
    console.log(user);



    return (
        <>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '20px',
            gap: '30px', // Adds spacing between elements
            width: '100%',
          }}
        >
          {/* Header */}
          <Box component="header" sx={{ width: '100%', textAlign: 'center' }}>
            <SectionTitle title="Welcome to your Dashboard!" />
          </Box>
  
          {/* Bubble Menu */}
          <Box
            component="section"
            sx={{
              display: 'flex',
              position: 'relative',
              justifyContent: 'center',
              alignSelf: 'center',
              width: '60%',
            }}
          >
            <BubbleMenu />
          </Box>
  
          {/* Notice Board */}
          <Box
            component="section"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <NoticeBoard />
          </Box>
        </Box>
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