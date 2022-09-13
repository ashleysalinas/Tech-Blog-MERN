import { getMyPosts, deletePost } from "../../utils/axios";
import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../../contexts/user.context';


const Profile = () => {
    const { currentUser } = useContext(UserContext);
    const userID = currentUser._id
    const [ myPosts, setMyPosts ] = useState([])
    useEffect(() => {
        getMyPosts(currentUser)
        .then(res => {
            const { data } = res
            setMyPosts(data)
        })
    }, [])
    
    const deleteThisPost = (_id) => {
       deletePost(_id, userID)
       .then(res => {
        const newPosts = res.data;
        setMyPosts(newPosts)
       })
    }

    return(
        <div>
            <h1>My Posts</h1>
            {myPosts.map(({ postTitle, postText, _id}) => {
                return (
                    <div key={_id}>
                        <h1>{postTitle}</h1>
                        <h2>{postText}</h2>
                        <button>Edit</button>
                        <button onClick={() => deleteThisPost(_id)}>X</button>
                    </div>
                )
            })}
        </div>
    )
}

export default Profile