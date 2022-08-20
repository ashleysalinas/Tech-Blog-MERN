import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { UserContext } from '../../contexts/user.context'

function Navigation() {
    const { currentUser, setCurrentUser } = useContext(UserContext)

    const handleSignout = () => {
        setCurrentUser(null)
    }
    return(
       <Fragment>
        <Link to='home'>Home</Link>
        {
            currentUser ? (
                <span onClick={handleSignout}>Sign Out</span>
            ) : (
                <Link to='login'>Login</Link>
            )
        }
        <Outlet />
       </Fragment>
    )
}

export default Navigation;