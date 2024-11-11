import { Container } from '@mui/material';
import styled from '@emotion/styled';
import propTypes from 'prop-types';

const LayoutContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
    width: '95%',
    minHeight: '90vh',
    marginTop: '5vh',
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

  Layout.propTypes = {
    children: propTypes.node,
  };
  
  export default Layout;