import { Fragment, useContext, useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { UserContext } from '../../contexts/user.context'
import '../../styles.scss'

function Navigation() {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    let navigate = useNavigate();       
    
    const handleSignout = () => {
        
        setCurrentUser(null)
        window.localStorage.removeItem('session-user')
        //redirect to homepage
        navigate('/redirect')
    }

    return(
        <Fragment>
        <div className="navbar">
        <Link to='home' id='homeLink'>MERN Tech Blog</Link>
        {
            currentUser ? (
                <div className="linksContainer">
                <Link to='home'>Home</Link>
                <Link to='profile'>Profile</Link>
                <Link to='newpost'>+</Link>
                <span onClick={handleSignout}>Sign Out</span>
                </div>
            ) : (
                <div className="linksContainer">
                    <Link to='login'>Login</Link>
                </div>
                
            )
        }
        </div>
        <Outlet />
       </Fragment>
    )
}

export default Navigation;