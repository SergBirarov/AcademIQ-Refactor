import { Typography, Container, Grid2, Box } from '@mui/material'
import { GetVw, GetVh } from '../utils/GeneralHelpers';
import { SectionTitle, SubSectionTitle } from '../components/common/SectionTitle';
import { useUser } from '../context/UserContext';
import BubbleMenu from '../components/common/home/BubbleMenu';
import NoticeBoard from '../components/common/home/NoticeBoard';




export default function Home() {
    const { user } = useUser();
    return (

        <>
        <Grid2 container spacing={3}>
            <Grid2 item xs={12} md={6}>
                <Box component={'header'}> 
                <SectionTitle title={`Welcome ${user?.firstName}!`}/>
                </Box>
            </Grid2>
            <Grid2 item xs={12} md={6}>
                <Box component={'section'} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px'}}>
                <BubbleMenu />
                </Box>
            </Grid2>
            <Grid2 item xs={12} md={6}>
                <Box component={'section'}>
                <NoticeBoard />
                </Box>
            </Grid2>
        </Grid2>
        </>

    )
}