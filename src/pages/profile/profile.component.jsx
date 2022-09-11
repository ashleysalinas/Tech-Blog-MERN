import { getMyPosts } from "../../utils/axios";
import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../contexts/user.context';


const Profile = () => {
    const { currentUser } = useContext(UserContext);
    const [ myPosts, setMyPosts ] = useState([])
    useEffect(() => {
        getMyPosts(currentUser)
        .then(res => {
            const { data } = res
            setMyPosts(data)
        })
    }, [])
    return(
        <div>
            <h1>My Posts</h1>
            {myPosts.map(({ postTitle, postText, id}) => {
                return (
                    <div key={id}>
                        <h1>{postTitle}</h1>
                        <h2>{postText}</h2>
                    </div>
                )
            })}
        </div>
    )
}

export default Profile