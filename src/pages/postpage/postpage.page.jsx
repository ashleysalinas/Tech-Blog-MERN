import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { grabComments } from '../../utils/axios';
const PostPage = () => {
    let { id } = useParams();
    let [post, setPost] = useState({})
    console.log(post)
    const { postTitle } = post;
    const { postText } = post;
    const creatorName = post.creatorName[0]
    const { postComments } = post;
    
    useEffect(() => {
        grabComments(id)
        .then(res => {
            const post = res.data[0]
            setPost(post)
        })
    }, [])
    
    return(
       <div>
        <h1>{postTitle}</h1>
        <h2>By: {creatorName.firstName} {creatorName.lastName}</h2>
        <p>{postText}</p>
       </div>
    )
}

export default PostPage;