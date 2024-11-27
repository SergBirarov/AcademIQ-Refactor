import React from 'react';
import propTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardActions,
  Avatar,
  Tooltip,
  IconButton,
  Stack,
  Typography,
  Box,
} from '@mui/material';
import { margin, styled } from '@mui/system';
import BookIcon from '@mui/icons-material/Book';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ContactMailIcon from '@mui/icons-material/ContactMail';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  // height: '80%',
  width: '80%',
  borderRadius: '16px',
  boxShadow: '0px 6px 18px rgba(0, 0, 0, 0.1)',
  backgroundColor: 'rgba(255, 255, 255, 0.15)', // Glassmorphism background
  backdropFilter: 'blur(10px)', // Glassmorphism blur
  border: '1px solid rgba(255, 255, 255, 0.3)', // Subtle border for glass effect
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 10px 24px rgba(0, 0, 0, 0.2)',
  },
}));

const StyledCardHeader = styled(CardHeader)(({ theme }) => ({
  backgroundColor: '#3f51b5',
  color: '#ffffff',
  backgroundImage: 'linear-gradient(135deg, #3f51b5 0%, #1e88e5 100%)', // Modern gradient
  padding: theme.spacing(1),
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    transform: 'scale(1.1)',
    color: '#fff',
  },
}));

export default function CompactCourseCard({ title, instructor }) {
  return (
    <StyledCard>
      {/* <StyledCardHeader> */}
        {/* <Avatar width="100px" height="40px" sx={{ backgroundColor: '#ffffff', color: '#3f51b5' }}>{title.charAt(0).toUpperCase()}</Avatar>
        <Typography variant="h6" fontWeight="bold">
          {title.split('-')[0].trim()}<br></br>
          {title.split('-')[1].trim()}
        </Typography>
        <Typography variant="body2" color="rgba(255, 255, 255, 0.8)">
          {instructor}
        </Typography> */}
      <StyledCardHeader
         avatar={<Avatar width="100px" height="40px" sx={{ backgroundColor: '#ffffff', color: '#3f51b5' }}>{title.charAt(0).toUpperCase()}</Avatar>}
        title={
            <>
          <Typography  variant="h6" fontWeight="bold">
            {title.split('-')[0].trim()}<br></br>
            {title.split('-')[1].trim()}
          </Typography>
          </>
        }

        subheader={
          <Typography variant="body2" color="rgba(255, 255, 255, 0.8)">
            {instructor}
          </Typography>
        }
      />
      <CardActions sx={{ justifyContent: 'center', paddingBottom: 2 }}>
        <Stack direction="row" spacing={2}>
          <Tooltip title="View Notes">
            <StyledIconButton aria-label="notebook">
              <BookIcon />
            </StyledIconButton>
          </Tooltip>
          <Tooltip title="Assignments">
            <StyledIconButton aria-label="assignments">
              <AssignmentIcon />
            </StyledIconButton>
          </Tooltip>
          <Tooltip title="Contact Instructor">
            <StyledIconButton aria-label="contact instructor">
              <ContactMailIcon />
            </StyledIconButton>
          </Tooltip>
        </Stack>
      </CardActions>
    </StyledCard>
  );
}

CompactCourseCard.propTypes = {
  title: propTypes.string.isRequired,
  instructor: propTypes.string.isRequired,
};
