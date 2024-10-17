import { Container } from '@mui/material';
import styled from '@emotion/styled';

const LayoutContainer = styled(Container)(({ theme }) => ({
    width: '95%',
    minHeight: '90vh',
    margin: 'auto',
    marginTop: '5vh',
    padding: theme.spacing(3),
    borderRadius: '16px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: theme.palette.background.paper,
  }));

  const Layout = ({ children }) => {
    return (
      <LayoutContainer>
        {children}
      </LayoutContainer>
    );
  };
  
  export default Layout;