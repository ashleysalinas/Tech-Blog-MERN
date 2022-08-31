import axios from 'axios';

const getPosts = (query) => {
    try {
        return axios.get('http://localhost:3001/api/posts')
    } catch (err) {
        console.log(err)
    }
}
const addUser = (formFields) => {
    try {
        return axios.post('http://localhost:3001/api/users', formFields)
    } catch (err) {
        console.log(err)
    }
}

const getUser = (email, password) => {
    try {
       return axios.get('http://localhost:3001/api/users',
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
        return axios.post('http://localhost:3001/api/myposts', currentUser)
    } catch (err) {
        console.log(err)
    }
}

export { getPosts, addUser, getUser, getMyPosts };