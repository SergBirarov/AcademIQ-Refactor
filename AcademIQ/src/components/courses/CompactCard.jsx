import { Card, Tooltip, IconButton, Avatar, CardHeader, CardActions, Stack } from '@mui/material';
import BookIcon from '@mui/icons-material/Book';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ContactMailIcon from '@mui/icons-material/ContactMail'; // Icon for contacting instructor
import propTypes from 'prop-types';

// // Styled Compact Course Card
// const CompactStyledCourseCard = styled(Card)({
//     display: 'flex',
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     height: '180px',
//     width: '150px',
//     borderRadius: '8px',
//     boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
//     transition: 'box-shadow 0.3s ease',
//     '&:hover': {
//         boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.3)',
//     },
// });

// // Compact Course Card Header with Gradient
// const CompactCourseCardHeader = styled(CardHeader)({
//     backgroundColor: '#3f51b5',
//     color: '#ffffff',
//     backgroundImage: 'linear-gradient(135deg, rgba(64,224,208,0.8) 0%, rgba(64,224,208,0.4) 100%)',
//     '& .MuiCardHeader-avatar': {
//         border: '2px solid #f3f3f3',
//         borderRadius: '50%',
//     },
//     padding: '8px',
// });

// // Actions container for Quick Action Course Card
// const CompactCourseCardActions = styled(CardActions)({
//     justifyContent: 'center',
//     padding: '4px',
// });



export default function CompactCourseCard({ title, instructor }){
    return (
        <Card sx={{
            display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '160px',
    width: '200px',
    borderRadius: '8px',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s ease',
    '&:hover': {
        boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.3)',
    },
        }}>
            <CardHeader
            sx={{
                backgroundColor: '#3f51b5',
    color: '#ffffff',
    backgroundImage: 'linear-gradient(135deg, rgba(64,224,208,0.8) 0%, rgba(64,224,208,0.4) 100%)',
    '& .MuiCardHeader-avatar': {
        border: '2px solid #f3f3f3',
        borderRadius: '50%',
    },
    padding: '8px',
            }}
                avatar={<Avatar>{title.charAt(0).toUpperCase()}</Avatar>}
                title={title}
                subheader={instructor}
            />
            <CardActions sx={{ justifyContent: 'center' }}>
                <Stack direction="row" spacing={2}>
                    <Tooltip title="View Notes">
                        <IconButton aria-label="notebook" size="small">
                            <BookIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Assignments">
                        <IconButton aria-label="assignments" size="small">
                            <AssignmentIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Contact Instructor">
                        <IconButton aria-label="contact instructor" size="small">
                            <ContactMailIcon />
                        </IconButton>
                    </Tooltip>
                </Stack>
            </CardActions>
        </Card>
    );
}

CompactCourseCard.propTypes = {
    title: propTypes.string.isRequired,
    instructor: propTypes.string.isRequired,
};