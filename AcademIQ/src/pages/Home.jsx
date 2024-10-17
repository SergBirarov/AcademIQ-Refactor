import { Typography, Container, Grid2} from '@mui/material'
import { GetVw, GetVh } from '../utils/GeneralHelpers';
import { SectionTitle } from '../components/common/home/SectionTitle';
import { useUser } from '../context/UserContext';
import BubbleMenu from '../components/common/home/BubbleMenu';
import { SectionSubtitle } from '../components/common/home/SectionSubtitle';
import NoticeBoard from '../components/common/home/NoticeBoard';


export default function Home() {
    const { user } = useUser();
    return (
        <Grid2 container spacing={2}>
        <Grid2 item xs={12} md={12} sx={{ height: `${GetVh(100)}` }} component={'header'}>
            <SectionTitle title={`Welcome ${user?.firstName}!`} />
        </Grid2>
        <Grid2 item xs={12} md={12}  component={'section'}>
            <BubbleMenu />
        </Grid2>
        <Grid2 item xs={12} md={12} component={'section'}>
            <NoticeBoard />
        </Grid2>
        </Grid2>
    )
}