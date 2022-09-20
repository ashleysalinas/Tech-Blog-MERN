import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { grabComments } from '../../utils/axios';
import { UserContext } from '../../contexts/user.context';
import AddCommentModal from './addCommentModal.component';
import Moment from 'moment';


const PostPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { currentUser } = useContext(UserContext);
    const [post, setPost] = useState({});
    const [creator, setCreator] = useState('');
    const [comments, setComments] = useState([]);
    const [show, setShow] = useState(false);
    
    const { postTitle } = post;
    const { postText } = post;
   

    useEffect(() => {
        grabComments(id)
        .then(res => {
            const post = res.data[0]
            setPost(post)
            setComments(post.postComments)
            setCreator(post.creatorName[0].firstName + ' ' + post.creatorName[0].lastName) //is there a cleaner way to do this?
        })
    }, [])

    const openModal = () => {
        setShow(true)
    }
    const closeModal = async () => {
        setShow(false)
        await grabComments(id)
        .then(res => {
            const post = res.data[0]
            setPost(post)
            setComments(post.postComments)
            setCreator(post.creatorName[0].firstName + ' ' + post.creatorName[0].lastName) //is there a cleaner way to do this?
        })
    }

    const addCommentFunc = () => {
        openModal();
    }

    const redirectLogin = () => {
        navigate('/login')
    }
    
    return(
       <div>
        <h1>{postTitle}</h1>
        <h2>By: {creator}</h2>
        <p>{postText}</p>
        <div>
        <p>Comments ({comments == null ? "0" : comments.length})</p>
        {currentUser ? <button onClick={addCommentFunc}> + </button> : <button onClick={redirectLogin}>Login to comment</button>}
        </div>
        <AddCommentModal show={show} closeModal={closeModal} id={id} userID={currentUser._id}/>
       
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