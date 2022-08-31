import { getMyPosts } from "../../utils/axios";
import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../contexts/user.context'

const Profile = () => {
    const { currentUser } = useContext(UserContext);
    const [ myPosts, setMyPosts ] = useState([])
    useEffect(() => {
        getMyPosts(currentUser)
        .then(res => {
            const { data } = res
        setMyPosts(data)
        console.log(myPosts)
        })
    }, [])
    return(
        <div>
            <h1>My Posts</h1>
        </div>
    )
}

export default Profile