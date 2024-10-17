import { Typography, Container } from '@mui/material'
import { GetVw, GetVh } from '../utils/GeneralHelpers';
import { SectionTitle } from '../components/common/home/SectionTitle';
import { useUser } from '../context/UserContext';
import BubbleMenu from '../components/common/home/BubbleMenu';


export default function Home() {
    const { user } = useUser();
    return (
        <>
        <Container component={'header'}>
            <SectionTitle title={`Welcome ${user?.firstName}!`} />
        </Container>
        <Container component={'section'}>
            <BubbleMenu />
        </Container>
        </>
    )
}