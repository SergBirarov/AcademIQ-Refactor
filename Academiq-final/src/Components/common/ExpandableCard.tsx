import React, { useState } from 'react';
import { Avatar, Box, Typography, IconButton, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import MessageIcon from '@mui/icons-material/Message';
import { User } from '../../types/User.type';
import { FcBusinessman } from "react-icons/fc";
import { ThemeProvider } from 'react-bootstrap';



interface ExpandableAvatarCardProps {
  avatar: string | null; // Image URL or null for fallback
  title: string;
  content: React.ReactNode;
  onActionClick: () => void;
}

const ExpandableAvatarCard: React.FC<ExpandableAvatarCardProps> = ({
  avatar,
  title,
  content,
  onActionClick,
}) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <StyledContainer
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      hovered={hovered}
    >
        {avatar  !== null ? (
            <Avatar
            src={avatar? avatar : undefined}
            alt={title}
            sx={{ width: 50, height: 50, cursor: 'pointer' }}
          >
          </Avatar>
        ): (
        <FcBusinessman size={50} />
    )}
      
      {hovered && (
        <Box sx={{ ml: 2, display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
            <Box>
          <Typography fontWeight={'bold'} variant="button" sx={{ marginRight: 2 }}>
             
            Instructor Name
          </Typography>
          <Typography variant="body2">Need help? <span> <Typography variant="button"> Contact me!</Typography> </span></Typography>
          </Box>
          <IconButton onClick={onActionClick} aria-label="send message">
            <MessageIcon />
          </IconButton>
        </Box>
      )}
    </StyledContainer>
  );
};

// Styled Component for handling the hover effect
interface StyledContainerProps {
  hovered: boolean;
}

const StyledContainer = styled(Box)<StyledContainerProps>(({ theme, hovered }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
  width: hovered ? 'auto' : '50px',
  padding: hovered ? '8px' : '0',
  borderRadius: '42px',
  backgroundColor: hovered ? theme.palette.background.default : theme.palette.background.default,
  boxShadow: hovered ? '0px 4px 12px rgba(0, 0, 0, 0.1)' : 'none',
  transition: 'all 0.3s ease-in-out',
  overflow: 'hidden',
}));

export default ExpandableAvatarCard;
