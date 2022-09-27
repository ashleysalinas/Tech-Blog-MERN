import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getUserProfile } from '../../utils/axios'
import Moment from 'moment';

const UserPage = () => {
    const { id } = useParams();
    const [ user, setUser ] = useState([])
    const [ userPosts, setUserPosts ] = useState([])
    const { firstName } = user;

    console.log(userPosts)
    
    useEffect(() => {
        getUserProfile(id)
        .then(res => {
            console.log(res)
            setUser(res.data[0])
            setUserPosts(res.data[0].userPosts)
        })
    }, [])


    return(<div>
        <h1>{firstName}'s Posts</h1>
        {userPosts === 0 ? <p>This user has not posted yet.</p> : userPosts.map(post => {
            const { _id, postTitle, postText, date } = post;
            const newDate = date.toString();
            const formattedDate = Moment(newDate).format('MM-DD-YYYY');

            return(
                <div key={_id}>
                    <Link to={'/post/' + _id}>{postTitle}</Link>
                    <p>Posted on {formattedDate}</p>
                    <p>{postText}</p>
                </div>
            )
        })}
    </div>)
}

export default UserPage;