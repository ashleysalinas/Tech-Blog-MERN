import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { grabComments } from '../../utils/axios';
import Moment from 'moment';
const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState({});
    const [creator, setCreator] = useState('');
    const [comments, setComments] = useState([])
    
    const { postTitle } = post;
    const { postText } = post;
   
    console.log(comments)
    useEffect(() => {
        grabComments(id)
        .then(res => {
            const post = res.data[0]
            setPost(post)
            setComments(post.postComments)
            setCreator(post.creatorName[0].firstName + ' ' + post.creatorName[0].lastName) //is there a cleaner way to do this?
        })
    }, [])
    
    return(
       <div>
        <h1>{postTitle}</h1>
        <h2>By: {creator}</h2>
        <p>{postText}</p>
       <p>Comments ({comments == null ? "0" : comments.length})</p>
       {comments.map(comment => {
        const {_id, commentText, commenterUsername, date} = comment
        const newdate = date.toString()
        const formattedDate = Moment(newdate).format('MM-DD-YYYY');
        return(
            <div key={_id}>
                <p>{commentText}</p>
                <p>Sent By {commenterUsername[0].firstName} {commenterUsername[0].lastName} on {formattedDate}</p>
            </div>
        )
       })}
       </div>
    )
}

export default PostPage;