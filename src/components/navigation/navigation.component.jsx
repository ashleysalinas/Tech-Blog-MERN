import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";

function Navigation() {
    return(
       <Fragment>
        <Link to='home'>Home</Link>
        <Link to='login'>Login</Link>
        <Outlet />
       </Fragment>
    )
}

export default Navigation;