import env from 'react-dotenv'
import axios from 'axios';

const getPosts = (query) => {
    try {
        return axios.get(`http://localhost:3001/api/posts`)
    } catch (err) {
        console.log(err)
    }
}
const addUser = (formFields) => {
    try {
        return axios.post(`http://localhost:3001/api/users`, formFields)
    } catch (err) {
        console.log(err)
    }
}

const getUser = (email, password) => {
    try {
       return axios.get(`http://localhost:3001/api/users`,
       {
        params: {
            email: email,
            password: password
       }
       })
    } catch (err) {
        console.log(err)
    }
}

const getMyPosts = (currentUser) => {
    try {
        return axios.post(`http://localhost:3001/api/myposts`, currentUser)
    } catch (err) {
        console.log(err)
    }
}

const addPost = (newPostInfo) => {
    try {
        return axios.post('http://localhost:3001/api/newpost', newPostInfo)
    } catch (err) {
        console.log(err)
    }
}

const deletePost = (_id, userID) => {
    try {
         return axios.delete('http://localhost:3001/api/delete', {
            method: 'delete',
            params: {
                _id,
                userID
            }
        })
    } catch(err) {
        console.log(err)
    }
}

const updatePost = ({newTitle, newText, _id}) => {
    try {
        return axios.post('http://localhost:3001/api/update',
            {
                _id,
                newTitle,
                newText
            }
        )
    } catch (err) {
        console.log(err)
    }
}

const grabComments = (id) => {
    try {
        return axios.post('http://localhost:3001/api/comment', {id})
    } catch (err) {
        console.log(err)
    }
}

const addComment = (id, userID, value) => {

    try {
        return axios.post('http://localhost:3001/api/newcomment', { id, userID, value })
    } catch (err) {
        console.log(err)
    }
}

const deleteComment = ({_id, postID}) => {
    try {
        return axios.delete('http://localhost:3001/api/deletecomment', {
            params:{_id, postID}
        })
    } catch (err) {
        console.log(err)
    }
}

const getUserProfile = (id) => {
    try {
        return axios.get('http://localhost:3001/api/getuserprofile', {
            params: {
                userID: id
            }
        })
    } catch (err) {
        console.log(err)
    }
}

const logout = () => {
    try {
        return axios.delete('http://localhost:3001/api/logout')
    } catch (err) {
        console.log(err)
    }
}
export { getPosts, addUser, getUser, getMyPosts, addPost, deletePost, updatePost, grabComments, addComment, deleteComment, getUserProfile, logout };