import * as React from 'react';
import { Box, Container  } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface HomeLayoutProps {
    children: React.ReactNode
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
    const theme = useTheme();

   
    return (
        <Container maxWidth={false} sx={{mt:3, mb:3, minHeight: 'calc(90vh - 64px)'}}>
      <Box
      sx={{
        flexGrow: 1,
        minHeight: '85vh',
        p: 3,
        padding: 3,
          borderRadius: 2,
          boxShadow: 3,
        transition: theme.transitions.create('margin', {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}
      >
        {children}
      </Box>
    </Container>
    );
}

export default HomeLayout;