import { addPost } from '../../utils/axios';
import { UserContext } from '../../contexts/user.context';
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const NewPost = () => {
    const { currentUser } = useContext(UserContext) //get user id to attach to post
    const navigate = useNavigate()

    const [newPost, setNewPost] = useState({
        postTitle: '',
        postText: ''
    })
    const { postTitle, postText } = newPost;

    const handleChange = (event) => {
        event.preventDefault();
       const { name, value } = event.target;
      setNewPost({...newPost, [name]: value})
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const { _id } = currentUser; //pulls user id to attach to post
        const newPostInfo = {newPost, _id} //object just makes it easier to pass through
        addPost(newPostInfo)
        navigate('home')
    };

    return(
        <div>
            <h1>Add a New Post</h1>
            <div>
                <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input type='text' required name="postTitle" onChange={handleChange} value={postTitle}></input>
                <label>Body</label>
                <input type='text' required name="postText" value={postText} onChange={handleChange}></input>
                <button type="submit">Post</button>
                </form>
            </div>
        </div>
    )
}

export default NewPost;