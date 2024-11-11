import { useSelector } from 'react-redux';
import Loading from '../navigation/Loading';
import propTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';


const PrivateRoute = ({ children }) => {
    const {token, status } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    if(status === 'loading') {
        return <Loading/>;
    }

    return token ? children :  navigate('/login');}

PrivateRoute.propTypes = {
    children: propTypes.node,
}

export default PrivateRoute;