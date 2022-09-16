import { Outlet, Navigate } from 'react-router-dom'
import { UserContext } from '../contexts/user.context';
import { useContext } from 'react';


const PrivateRoute = ({ children, ...rest }) => {
    const { currentUser } = useContext(UserContext);
    
    return(
        currentUser
        ?
        <Outlet />
        :
        <Navigate to='/' />
    )
}

export default PrivateRoute;