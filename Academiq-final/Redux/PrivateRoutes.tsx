import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/store/store';
import { useNavigate } from 'react-router-dom';
import Loading from '../src/Pages/navigation/Loading';

interface PrivateRouteProps {
  children: ReactElement; // Enforces a React element as a child
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { token, status } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  if (status === 'loading') {
    return <Loading />;
  }

  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
    }
  }, [token, navigate]);
  // if (!token) {
  //   navigate('/login', { replace: true });
  //   return null;
  // }

  return children;
};

export default PrivateRoute;
