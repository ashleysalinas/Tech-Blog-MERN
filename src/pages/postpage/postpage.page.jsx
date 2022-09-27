import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { grabComments, deleteComment } from '../../utils/axios';
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
            let comments = post.postComments.reverse()
            setComments(comments)
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

    const deleteCommentHandler = (_id) => {
        const postID = id
        deleteComment({_id, postID})
         .then(res => {
            const newComments = res.data;
            setComments(newComments)
        })
    }
    
    return(
        <>
       <div>
        <h1>{postTitle}</h1>
        <h2>By: {creator}</h2>
        <p>{postText}</p>
        <div>
        <p>Comments ({comments == null ? "0" : comments.length})</p>
        {currentUser ? <div><button onClick={addCommentFunc}> + </button> <AddCommentModal show={show} closeModal={closeModal} id={id} userID={currentUser._id}/> </div>: <button onClick={redirectLogin}>Login to comment</button>}
        </div>
        
       
       {comments.map(comment => {
        const {_id, commentText, commenterUsername, date} = comment
        const commenterID = commenterUsername[0]._id
        const newdate = date.toString()
        const formattedDate = Moment(newdate).format('MM-DD-YYYY');
        return(
            <div key={_id}>
                <p>{commentText}</p>
                <p>Sent By {commenterUsername[0].firstName} {commenterUsername[0].lastName} on {formattedDate}</p>
                { currentUser && currentUser._id === commenterID ? <button onClick={() => {deleteCommentHandler( _id)}}>Delete</button> : <p></p> }
            </div>
        )
       })}
       </div>
       </>
    )
}

export default PostPage;