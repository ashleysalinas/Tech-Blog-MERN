import { getMyPosts, deletePost } from "../../utils/axios";
import { useEffect, useContext, useState, } from 'react';
import { UserContext } from '../../contexts/user.context';
import EditModal from './editModal.component';
import { Link } from 'react-router-dom';
import Moment from 'moment';

const Profile = () => {
    const { currentUser } = useContext(UserContext);
    const userID = currentUser._id;
    const [ myPosts, setMyPosts ] = useState([]);
    const [ showModal, setShowModal ] = useState(false);
    const [ postData, setPostData ] = useState({});

    const closeModal = async () => {
        setShowModal(false)
        await getMyPosts(currentUser)
        .then(res => {
            let posts = res.data
            posts = posts.reverse()
            setMyPosts(posts)
        }) 
    }
    const openModal = () => {
        setShowModal(true)
    }
    useEffect(() => {
        getMyPosts(currentUser)
        .then(res => {
            let posts = res.data
            posts = posts.reverse()
            setMyPosts(posts)
        })
    }, [])
    
    const deleteThisPost = (_id) => {
       deletePost(_id, userID)
       .then(res => {
        const newPosts = res.data;
        setMyPosts(newPosts)
       })
    }


    const editThisPost = async (post) => {
        openModal();
        setPostData(post)
    }

    return(
        <>
        <div>
            <h1>My Posts</h1>
            {myPosts.length === 0 ? <p>No posts yet. Make your first one <Link to='/newpost'>here</Link>!</p> : 
            myPosts.map((post) => {
                const { postTitle, postText, _id, date} = post
                const newdate = date.toString()
                const formattedDate = Moment(newdate).format('MM-DD-YYYY');
                return (
                    <>
                    <div key={_id}>
                        <Link to={'/post/' + _id}>{postTitle}</Link>
                        <p>Posted on {formattedDate}</p>
                        <h2>{postText}</h2>
                        <button onClick={() => editThisPost(post)}>Edit</button>
                        <button onClick={() => deleteThisPost(_id)}>X</button>
                    </div>
                    <EditModal show={showModal} closeModal={closeModal} postData={postData}/>
                    </>
                    )
                })
        }
        </div>
        </>
    )
}

export default Profile