import { getMyPosts, deletePost } from "../../utils/axios";
import { useEffect, useContext, useState, } from 'react';
import { UserContext } from '../../contexts/user.context';
import EditModal from './editModal.component'


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
            const { data } = res
            setMyPosts(data)
        }) 
    }
    const openModal = () => {
        setShowModal(true)
    }

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


    const editThisPost = async (post) => {
        openModal();
        setPostData(post)
    }

    return(
        <>
        <div>
            <h1>My Posts</h1>
            {myPosts.map((post) => {
                const { postTitle, postText, _id} = post
                return (
                    <>
                    <div key={_id}>
                        <h1>{postTitle}</h1>
                        <h2>{postText}</h2>
                        <button onClick={() => editThisPost(post)}>Edit</button>
                        <button onClick={() => deleteThisPost(_id)}>X</button>
                    </div>
                    <EditModal show={showModal} closeModal={closeModal} postData={postData}/>
                    </>
                )
            })}
        </div>
        </>
    )
}

export default Profile