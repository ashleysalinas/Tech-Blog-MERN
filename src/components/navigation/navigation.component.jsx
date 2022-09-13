import { Fragment, useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { UserContext } from '../../contexts/user.context'

function Navigation() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    let navigate = useNavigate();

    const handleSignout = () => {
        
        setCurrentUser(null)
        //redirect to homepage
        navigate('/redirect')
    }

    return(
       <Fragment>
        <Link to='home'>Home</Link>
        {
            currentUser ? (
                <div>
                <Link to='profile'>Profile</Link>
                <Link to='newpost'> + </Link>
                <span onClick={handleSignout}>Sign Out</span>
                </div>
            ) : (
                <Link to='login'>Login</Link>
            )
        }
        <Outlet />
       </Fragment>
    )
}

export default Navigation;